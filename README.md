# Getting started with FlytBase APIs
To facilitate REST calls and be able to respond to internal and external requests, we will be running a simple HTTP server using Python. 

If you don’t have Python installed (most likely you’re on Windows), get a [Python installer](http://python.org/)

Once you do, install SimpleHTTPServer using the command: 
```pip install simple-http-server```

## Running the server
* Open a terminal window.
* Navigate to this `app_template` directory.
* Execute the command `python -m http.server 4200` to start the server if you are using Python 3. You can use `python -m SimpleHTTPServer 4200` for Python 2.
* Open a web browser at [http://localhost:4200/](http://localhost:4200/).

For more information about the SimpleHTTPServer, please refer to this [link](https://docs.python.org/2/library/simplehttpserver.html).