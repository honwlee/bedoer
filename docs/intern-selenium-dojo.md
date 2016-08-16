# using intern with selenium to test dojo widgets

1. start selenium server

  a. download selenium server jar [selenium server](http://selenium-release.storage.googleapis.com/index.html?path=3.0-beta2/)
  
  b. start server: 
  
  >> $ java -jar selenium-server-standalone-2.45.0.jar
  
2. install selenium webdriver

  >> $ npm install selenium-webdriver -g
  
3. testing example widgets

  a. clone example:
  
  >> $ git clone https://github.com/theintern/intern-examples
  
  b. install packages:
  
  >> $ npm install -g bower
  
  >> $ npm install
  
  >> $ bower install
  
  c. test
  
  >> $ npm test
  
4. links

  * [https://github.com/theintern/intern-examples](https://github.com/theintern/intern-examples)
  * [https://www.npmjs.com/package/selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
