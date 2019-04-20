module.exports = (api, opts) => {
    if (opts.useCustomDirs) {
        api.render('./templates/dirs');
    }

    if (opts.addArchiveScript) {
        api.extendPackage({
            scripts: {
                archive: 'node ./archive ./dist ./dist.zip',
                buildArchive: 'npm run build && npm run archive',
            },
            devDependencies: {
                'zip-dir': '^1.0.2',
            },
        })
        api.render({
            './archive.js': './templates/scripts/archive.js',
        });
    }

    if (opts.addDeploy) {
        api.extendPackage({
            scripts: {
                send: 'node ./deploy',
                deploy: 'npm run buildArchive && npm run send',
            },
            devDependencies: {
                'ssh2-sftp-client': '^2.5.0',
            }
        });
        api.render({
            './deploy.js': './templates/scripts/deploy.js',
        })
    }

    api.extendPackage({
        devDependencies: {
            '@babel/plugin-proposal-optional-chaining': '^7.2.0'
        }
    })
    api.render({
        './.eslintrc.js': './templates/.eslintrc.js',
    })
};
