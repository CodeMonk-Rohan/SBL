import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import threading
address = ('', 8000)

def start_server():
    print("Starting server...")
    #long ahh code to navigate to the correct directory
    os.chdir(os.path.join(os.getcwd(), "mini-mini-project"))

    server = HTTPServer(address, SimpleHTTPRequestHandler)
    server.serve_forever()

# open the browser at the login page and to ensure that the server doesn't block that action, 
# we use multithreading

if __name__ == "__main__":
    server_thread= threading.Thread(target=start_server)
    server_thread.start()

    target_url = f'http://localhost:{address[1]}/login.html'
    webbrowser.open(url=target_url)





