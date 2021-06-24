import random
import math

def hellinger_distance(array1,array2):
    argument = 0
    for i in range(len(array1)):
        argument += (math.sqrt(array1[i]) - math.sqrt(array2[i]))**2
    sqr = math.sqrt(argument)   
    final = sqr/math.sqrt(2) 
    return argument


anomalies = [0.69,0.66]
threshold = 0.71
hellinger_distances = [1]*len(anomalies)
for i in range(len(anomalies)):
    for j in range(1000):
        generated_point = random.uniform(threshold,1)
        artificial_distr = [generated_point,1-generated_point]
        anomaly_distr = [anomalies[i],1-anomalies[i]]
        hd = hellinger_distance(artificial_distr,anomaly_distr)
        if hd<hellinger_distances[i]:
            hellinger_distances[i] = hd
print(hellinger_distances) 
