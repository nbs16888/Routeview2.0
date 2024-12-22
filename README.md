# Instructions

```bash
RouteView 2.0, an enhanced iteration of the route planning system for ships sailing through Arctic ice zones (RouteView), was meticulously designed to provide ships with real-time route optimization and calculation during Arctic voyages, ensuring precise navigation through ice zones. The development and testing of RouteView 2.0 were conducted on a high-performance computer featuring an Intel Core i7-10700HQ @ 2.90 GHz processor and 32 GB of memory operating on a 64-bit Windows 11 OS. For deployment, RouteView 2.0 uses an Ubuntu 18.0.4 server equipped with Nginx, Redis, and JDK 1.8.x, which boasts 64 GB of RAM. The system is accessible and deployable on both the front and back ends through a Nginx proxy.
```

## Development & deployment

```bash
Step1:clone code from https://github.com/nbs16888/Routeview2.0.git

Step2: create Mysql or Postgresql database ry-flowable-plus and execute database sql files as follows mysql\_ry\_v0.8.X.sql、mysql\_xxl\_job.sql、flowable\_6.7.2\_mysql sequentially 

Step3: edit project root directory src\\main\\pom.xml <java.version>8</java.version> and resources\\application-dev.yml database link message

Step4: execute commond : mvn package or maven package jar file then by execute a commond: java –jar xxx.jar to start server  

Step5: to ruoyi-ui directory and execute npm install --registry=https://registry.npmjs.org to install npm dependents

Step6: start front execute npm run dev

If necessary can use Nginx to agent ip then can access to url: [http://210.72.81.169:8080](http://210.72.81.169:8080)
```

## System instruction

```bash
3.1About Operational planning：

Feature description:

This module can view ships loaction and affecting the navigation in real time and Replanning through these factors

Instructions:

Click in turn to access menu as follows Routes planning-> Tactical stage -> Operational planning By default, the 

first ship in the voyage is selected.

The left side will show Ship information as follows.

The center will show analysis area.

The right side will show Real-time operational planning for vessels include Replanning、Results and reports and 

Digital twin users can select some parametres such as floes、sea fog and so on .

Initial planning

Feature description:

This module will show the historical route and calculate the future strategic route based on the user's choice of 

start and end points and time.

Instructions:

(1) Menu path : Routes planning > Strategic stage > Initial planning.

(2) Descriptions of each area of the interface:

There is a conditional selection panel on the left side that includes two time periods.One is the historical period, 

and the other is the strategic plan for 2024 and beyond.The lower left corner is the legend,the upper right side is 

the indicator display area, and the lower right corner is the accessible schedule.

(3) Examples of user actions.

When the history tab is selected, the route and related indicators for the first navigable date in 2012 will be 

displayed by default.

Besides,the ship type can be selected in the History tab.

Select the Forecast tab, it will be prompted to complete the labeling of the start and end points on the map.

You can choose to skip or the next step.

The first step is to mark the starting point on the map.

The second step is to mark the end point on the map.

Once you have completed the above two steps, you can click the submit button to plot the calculation results of 

the strategic route on the map.

When you click on the icon behind the date, a date selection window will pop up like this.The green checkmark is 

an optional date, which is the date of navigation.Other dates are non-operable and cannot be selected.

The same meaning and click-through effect on The Accessible Schedule.

Below is the strategic route drawn after the start and end points are marked and the submit button is clicked,the 

metric display area displays the metric calculation results of the current path.

3.3 Routes compare

Feature description:

This module will show the cost-effective cost of the route from Shanghai or Dalian to the four ports of Pevek, 

Tiksi, Sabetta, Murmansk and Rotterdam.

Instructions:

(1) Menu path : Economic viability > Routes compare.

(2) Descriptions of each area of the interface:

On the left is the conditional selection are,in the lower left corner is the legend.

Examples of user actions.


Select the starting and ending ports, ship type, scenario, ship Departure Time.

Note: 1.When choosing the port of Rotterdam, the economic value and cost comparison of the Arctic shipping route and the Suez shipping route will be presented,there is a Compare button that shows the economic value and cost comparison when clicked.2.Choosing other ports will demonstrate the economic value and cost information of the Arctic shipping routes,there is an information button that displays economic value and cost information when clicked. 3.Selecting Scenario will determine the date range that can be selected.
Taking Shanghai to Sabeta as an example,click on the icon behind the date, a date selection window will pop up like this.

When the message "There is no value for the ..." is displayed, there is no date for the current year or the current month.

You should select a different year or month until a date with a green checkmark is selected.

The indicator corresponding to the selected date will be displayed in the window on the right.

This is a comparison between the Arctic Route and the Suez Canal with Rotterdam as the endpoint.
```

