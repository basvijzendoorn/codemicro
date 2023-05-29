## Installation
Create a mysql database and change the settings in application.properties.
Use the same database settings for both spring.datasource as flyway.

```
spring.datasource.url = jdbc:mysql://localhost:3306/example
spring.datasource.username = root
spring.datasource.password = databasePassword
flyway.url = jdbc:mysql://localhost:3306/example
flyway.user = root
flyway.password = databasePassword
```

## Usage
Start the main method in DemoApplication.java. 
After startup the endpoints of the controllers can be used.
