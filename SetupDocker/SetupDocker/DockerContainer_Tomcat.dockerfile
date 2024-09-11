# Use the official Tomcat image
FROM tomcat:10.1-jdk17

# Change the default port from 8080 to 8081
RUN sed -i 's/8080/8081/g' /usr/local/tomcat/conf/server.xml

# Expose the new port
EXPOSE 8081

# Start Tomcat
CMD ["catalina.sh", "run"]
