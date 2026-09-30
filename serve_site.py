#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Serve bagcilar_kasap_website.html at '/' on port 3000 (0.0.0.0)."""
import http.server, socketserver, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in ("/", "/index.html", ""):
            self.path = "/bagcilar_kasap_website.html"
        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    with Server(("0.0.0.0", 3000), Handler) as httpd:
        print("Aykan Et & Mangal website serving on :3000 ...", flush=True)
        httpd.serve_forever()
