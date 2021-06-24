import xml.etree.ElementTree as ET

import random
from .utilities.util import *
from .Problem import *

#######
# XES #
#######

class Rocksample_Problem(Problem):

    def __init__(self, xes_log = None,states = ["rock 0","rock 1","rock 2","rock 3","rock 4","rock 5","rock 6","rock 7","rock 8","rock 9","rock 10","rock rel"],actions = ["north","south","west","east","sample","check 0","check 1","check 2","check 3","check 4","check 5","check 6","check 7","check 8","check 9","check 10"],num_traces_to_analyze = None):
        super().__init__(xes_log,states,actions)
        self.coord_x_in_runs = []
        self.coord_y_in_runs = []
        self.sampled_in_runs = []
        self.states_prova = ["rock 0","rock 1","rock 2","rock 3","rock 4","rock 5","rock 6","rock 7","rock 8","rock 9","rock 10","rock rel"] 
        self.parse_xes(xes = xes_log, num_traces_to_analyze = num_traces_to_analyze)
    def parse_xes(self, xes, num_traces_to_analyze):
        """
        Parse xes log and build data from traces
        """
        log = self.xes_tree.getroot()
        count = 0
        rocks = []
        for rock in node_from_key(log,'rocks'):
           rocks.append([int(node_from_key(rock,'coord x').attrib['value']),int(node_from_key(rock,'coord y').attrib['value'])])
       
        for trace in log.findall('xes:trace', XES_NES):
            if num_traces_to_analyze != None and count > num_traces_to_analyze: 
                return
            count += 1
            # FIXME: this is probably redundant in xes
            self.run_folders.append('run {}'.format(
                int(node_from_key(trace, 'run').attrib['value'])))
            # each xes trace is a POMCP's run
            self.coord_x_in_runs.append([])
            self.coord_y_in_runs.append([])
            self.actions_in_runs.append([])
            self.belief_in_runs.append([])
            self.sampled_in_runs.append([])             
            sampled = [0]*11     
            for event in trace.findall('xes:event', XES_NES):
                # attributes
                coord_x = int(node_from_key(event,'coord x').attrib['value'])
                coord_y = int(node_from_key(event,'coord y').attrib['value'])
                self.coord_x_in_runs[-1].append(coord_x)
                self.coord_y_in_runs[-1].append(coord_y)
                action = node_from_key(event,'action').attrib['value']
                self.actions_in_runs[-1].append(action)
                self.sampled_in_runs[-1].append([i for i in sampled])
                coords = [coord_x,coord_y]
                total = 0
                # belief
                belief_dict = {}
                for state in self.states_prova:
                    belief_dict[str(state)] = 0
                    
                self.belief_in_runs[-1].append(belief_dict)
                    
                for i in node_from_key(event, 'belief'):
                    state = i.attrib['key']
                    particles = int(i.attrib['value'])
                                        
                    rocks_set =str(int(bin(int(state))[2:]))[::-1]
                    total += particles
                    for rock in range(len(rocks_set)):
                        if rocks_set[rock] == "1":
                            self.belief_in_runs[-1][-1]['rock '+str(rock)] += particles
                for state in self.states_prova: 
                    self.belief_in_runs[-1][-1][state] /= total
               
                if coords in rocks:
                    if sampled[rocks.index(coords)] == 0:
                         self.belief_in_runs[-1][-1]['rock rel'] = self.belief_in_runs[-1][-1]['rock '+str(rocks.index(coords))]
                    else:
                         self.belief_in_runs[-1][-1]['rock rel'] = 0.0
                    if action == 'sample':
                       sampled[rocks.index(coords)] = 1

