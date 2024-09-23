<style>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<h1>ARISE PoC</h1>

https://arise-middleware.eu/

<br>

PoC of an all-in-one data management platform that collects and visualizes data from an OPC UA server.

![ARISE PoC Schema](./docs/images/ARISE-Schema.png "ARISE PoC Schema")

<h2>Requirements</h2>
<ul>
    <li>Docker Engine</li>
    <li>Minimum 8GB RAM</li>
    <li>Docker Compose >= 1.29</li>
</ul>

<br>

<h2>How to run</h2>
<h3>Download the repository:</h3>
<code>git clone https://github.com/Engineering-Research-and-Development/arise-poc.git</code>

<h3>Configure the platform</h3>
Edit the <b>docker-compose.yaml</b> file and configure iotagent-opcua according to your OPC UA Server specifications.
<br><br>
For a more complete description on how to configure the IoTAgent, go to <a href="https://github.com/Engineering-Research-and-Development/iotagent-opcua/blob/master/docs/howto.md">IotAgent OPCUA how-to guide.</a>

<br>
If any change is made to the mapping configuration, edit the subscription configuration of QuantumLeap accordingly, going to conf/quantumleap/subscription/subscription-ld.yaml

<h3>Build & Run containers:</h3>

<code>docker-compose up --build -d</code>

<br>

<h3>Access the UIs</h3>

1. Grafana at (https://localhost:3000)
2. Default credentials are: admin/admin

<br>

For more information, the full tutorial is available at the following [link](https://github.com/Engineering-Research-and-Development/arise-poc/blob/main/docs/ARISE_PoC_Tutorial_Extended.md)