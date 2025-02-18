
<h1>ARISE PoC</h1>

https://arise-middleware.eu/


PoC of an all-in-one data management platform that collects and visualizes data from  OPCUA and ROS2 devices.

<p align="center">
  <img src="./docs/images/ARISE-Schema-v2.png" alt="ARISE PoC Schema">
</p>

<h2>Requirements</h2>
<ul>
    <li>Docker Engine</li>
    <li>Minimum 8GB RAM</li>
    <li>Docker Compose >= 1.29</li>
</ul>

<br>

<h2>How to run</h2>
<h3>Download the repository:</h3>

```
git clone https://github.com/Engineering-Research-and-Development/arise-poc.git
```

<h3>Configure the platform</h3>
Edit the <b>docker-compose.yaml</b> file and configure iotagent-opcua according to your OPC UA Server specifications.
<br><br>
For a more complete description on how to configure the IoTAgent, go to <a href="https://github.com/Engineering-Research-and-Development/iotagent-opcua/blob/master/docs/howto.md">IotAgent OPCUA how-to guide.</a>

<h3>Build & Run containers:</h3>

```
docker compose up --build -d
```

## Starting the demo
Before starting the demo, as X11 session owners, other users must be allowed to use the X Window System (to show the
turtles on screen).
For that, the following command is executed:

```
xhost local:root
```

When the dockers have started, connect to bash in the container of ros2:
```
docker exec -ti ros2 bash
```

Now the TurtleSim and the Keyboard controller can be started:

```
source /ros2-ws/install/setup.bash

# Show the turtles on the screen
ros2 run docs_turtlesim turtlesim_node_keys &

# Keyboard controller to move the turtles.
ros2 run docs_turtlesim turtlesim_multi_control 
```

<h3>Access the UIs</h3>

1. Grafana at (https://localhost/login)
2. Default credentials are: admin/admin

<br>

For more information, the full tutorial is available at the following [link](https://github.com/Engineering-Research-and-Development/arise-poc/blob/main/docs/ARISE_PoC_Tutorial_Extended.md)
