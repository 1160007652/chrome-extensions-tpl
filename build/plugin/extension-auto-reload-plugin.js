const fs = require('fs');
const url = require('url');
const SseStream = require('ssestream');

const extensionAutoReload = (_compiler, opts) => {
  const middleware = (req, res, next) => {
    // 路由匹配失败， 不执行
    if (url.parse(req.url).pathname === opts.path) {
      const se = new SseStream(req);
      se.pipe(res);

      let closed = false;
      const contentScriptsModules = fs.readdirSync(opts.contentScriptPath);
      _compiler.hooks.done.tap('extension-auto-reload-plugin', (stats) => {
        if (closed) return;

        const { modules } = stats.toJson({ all: false, modules: true });

        let shouldReload = false;

        if (modules.length > 0 && contentScriptsModules.length > 0) {
          contentScriptsModules.forEach((contentName) => {
            const findModules = modules.find((item) => {
              if (item.type === 'module') {
                if (item.issuerName && item.issuerName.startsWith(`./src/app/Contents/${contentName}`)) {
                  return true;
                } else if (item.name && item.name.startsWith(`./src/app/Contents/${contentName}`)) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            });

            if (findModules) {
              shouldReload = true;
            }
          });
        }

        if (shouldReload) {
          se.write(
            {
              event: 'compiled successfully',
              data: {
                action: 'reload extension and refresh current page',
              },
            },
            'utf-8',
            (err) => {
              if (err) {
                console.error(err);
              }
            },
          );
        }
      });

      res.on('close', () => {
        closed = true;
        se.unpipe(res);
      });
    }
    next();
  };

  return middleware;
};

module.exports = extensionAutoReload;
