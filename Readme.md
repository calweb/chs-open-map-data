# Charleston, SC Public Map Data

In the quest to find some public data sets in Charleston, I stumbled upon lots of maps, some really cool, and some, meh. But ultimately, when trying to use the raw data, I found that coordinates were not [latitude, longitude] or even geojson.  So began my little rabbit hole to convert them from one coordinate system to another or from a shape file to geojson.

For the coordinate system transformation, i used [proj4js](https://github.com/proj4js/proj4js) and to convert shape files, I used [this blog post](http://ben.balter.com/2013/06/26/how-to-convert-shapefiles-to-geojson-for-use-on-github/)

The raw map data can be found:

- [City of Charleston Data Portal](http://gis.charleston-sc.gov/dataportal/)
- [SC DHEC GIS Data Clearninghouse (registration required)](http://www.scdhec.gov/HomeAndEnvironment/maps/GIS/GISDataClearinghouse/)

To view the data on the map: http://calweb.github.io/chs-open-map-data/
