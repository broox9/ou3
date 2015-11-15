module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  console.log("SHIPIT", shipit);
  shipit.initConfig({
    default: {
      workspace: '/tmp/ou3',
      deployTo: '/var/www/ou3',
      // dirToCopy: 'public',
      repositoryUrl: 'https://github.com/broox9/ou3.git',
      ignores: ['.git', 'node_modules', 'bower_components', '.idea', '.ebextensions'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '~/.ssh/id_rsa',
      shallowClone: true
    },
    staging: {
      servers: 'deploy@162.243.69.74'
    }
  });

  shipit.task('pwd', function(shipit) {
    return shipit.remote('pwd');
  });
};
