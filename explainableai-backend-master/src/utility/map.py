from src.xpomcp.State import State

'''States for Tiger problem '''
TIGER_LEFT = State("tiger left")
TIGER_RIGHT = State("tiger right")
'''States for Velocity regulation problem '''
EASY = State(0)
INTERMEDIATE = State(1)
DIFFICULT = State(2)
'''States for Rocksample problem'''
ROCK_0 = State("rock 0")
ROCK_1 = State("rock 1")
ROCK_2 = State("rock 2")
ROCK_3 = State("rock 3")
ROCK_4 = State("rock 4")
ROCK_5 = State("rock 5")
ROCK_6 = State("rock 6")
ROCK_7 = State("rock 7")
ROCK_8 = State("rock 8")
ROCK_9 = State("rock 9")
ROCK_10 = State("rock 10")
ROCK_REL = State("rock rel")
'''
MAP BETWEEN ACTION AND STRING. 
'''

MAP_STATES_TO_FRONTEND = {
    0: "easy",
    1: "intermediate",
    2: "difficult",
    "tiger left": "tiger left",
    "tiger right": "tiger right",
    "rock 0" : "rock 0",
    "rock 1" : "rock 1",
    "rock 2" : "rock 2",
    "rock 3" : "rock 3",
    "rock 4" : "rock 4",
    "rock 5" : "rock 5",
    "rock 6" : "rock 6",
    "rock 7" : "rock 7",
    "rock 8" : "rock 8",
    "rock 9" : "rock 9",
    "rock 10" : "rock 10",
    "rock rel" : "rock rel",
}

MAP_ACTIONS_TO_FRONTEND = {
    0: "slow",
    1: "medium",
    2: "fast",
    "open left": "open left",
    "open right": "open right",
    "listen": "listen",
    "sample" : "sample",
    "north" : "north",
    "south" : "south",
    "east" : "east",
    "west" : "west",
    "check 0" : "check 0",
    "check 1" : "check 1",
    "check 2" : "check 2",
    "check 3" : "check 3",
    "check 4" : "check 4",
    "check 5" : "check 5",
    "check 6" : "check 6",
    "check 7" : "check 7",
    "check 8" : "check 8",
    "check 9" : "check 9",
    "check 10" : "check 10"
}

MAP_ACTIONS_TO_BACKEND = {
    "slow": 0,
    "medium": 1,
    "fast": 2,
    "open left": "open left",
    "open right": "open right",
    "listen": "listen",
    "sample" : "sample",
    "north" : "north",
    "south" : "south",
    "east" : "east",
    "west" : "west",
    "check 0" : "check 0",
    "check 1" : "check 1",
    "check 2" : "check 2",
    "check 3" : "check 3",
    "check 4" : "check 4",
    "check 5" : "check 5",
    "check 6" : "check 6",
    "check 7" : "check 7",
    "check 8" : "check 8",
    "check 9" : "check 9",
    "check 10" : "check 10"
}

MAP_TRACES = {
    "velocity regulation arms": "vr_ARMS.xes",
    "tiger correct": "tiger_correct.xes",
    "tiger 40": "dataset_tiger_40.xes",
    "tiger 60": "dataset_tiger_60.xes",
    "tiger 80": "dataset_tiger_80.xes",
    "velocity regulation 10": "obstacle_avoidance_10.xes",
    "velocity regulation 100": "obstacle_avoidance_100.xes",
    "vr 50 no shields" : "vr_50_no_shield.xes", 
    "vr 70 no shields" : "vr_70_no_shield.xes",
    "vr 90 no shields" : "vr_90_no_shield.xes",
    "vr 103 no shields" : "vr_103_no_shield.xes",
    "rocksample small" : "rocksample_small.xes",
    "rocksample big" : "rocksample_pow13_particles.xes"
}
