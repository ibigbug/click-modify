#1/usr/bin/env python

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options

define('port', default=8000, help='run on the given port', type=int)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        f = open('assets/demo.html')
        content = f.read()
        f.close()
        self.write(content)

    def post(self):
        print 'got post arguments %s' % self.request.arguments

        key = self.get_argument('key1', None)
        if not key:
            #emulate post fail
            self.write('{"stat":"fail", "msg":"missing argument"}')

        print 'got a post argument key as value %s' % key
        self.write('{"stat":"ok", "msg": "got arg key" }')


def main():
    tornado.options.parse_command_line()
    application = tornado.web.Application([
        (r'/', MainHandler),
        (r'/src/(.*)', tornado.web.StaticFileHandler, {'path': 'src/'}),
        (r'/assets/(.*)', tornado.web.StaticFileHandler, {'path': 'assets/'}),
    ])
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
    print 'Starting server at: 127.0.0.1:%s' % options.port
    main()
