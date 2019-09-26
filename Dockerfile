FROM eastusreg.spatialitics.net/nginx-alpine:v1.0.0.0

RUN addgroup -S spatialiticsgroup && \
    adduser -S spatialiticsuser -G spatialiticsgroup 

# directories where user spatialiticsuser and group spatialiticsgroup requires ownership
RUN chown -R  spatialiticsuser /etc/nginx/
RUN chown -R  spatialiticsuser /usr/share/nginx/html/
RUN chown -R  spatialiticsuser /var/cache/nginx/
RUN chown -R  spatialiticsuser /var/run/
RUN chown  spatialiticsuser:spatialiticsgroup /usr/sbin/nginx
 
## Remove default nginx website 
RUN rm -rf  /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in publish folder to default nginx public folder
COPY /publish /usr/share/nginx/html

COPY ./setEnvVariables.sh /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY ./nginx.conf  /etc/nginx/

EXPOSE 9500

# To keep docker image smaller in size, Alpine docker image doesn't have bash installed by default.
# so runt he commands with "/bin/sh"
RUN ["/bin/sh", "-c", "chmod -R 777 /usr/share/nginx/html"]

CMD ["/bin/sh", "/usr/share/nginx/html/setEnvVariables.sh"] 

USER spatialiticsuser
