const args = process.argv;
const myArgs = args.slice(2);
const child = require('child_process');
const fs = require('fs');
const path = require('path');

const color = {
  reset: '0',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  cyan: '36',
  white: '37'
};

const commands = {
  help: {
    cmd: 'h||help',
    info: 'Get the help (list of commands)',
    func: help
  },
  run: {
    cmd: 'r||run',
    info: 'Start the server and test your work',
    func: run
  },
  configShow: {
    cmd: 'config||cfg',
    info: 'Show config',
    func: showConfig
  },
  create: {
    cmd: 'create',
    info: 'Create something',
    func: create
  },
  clean: {
    cmd: 'clean',
    info: 'Clean file that you won\'t use.',
    func: clean
  }
};

function clean() {
  const filesToClean = [
    './src/github/images/helloworld.png',
    './src/github/images/readmeMain.png',
    './LICENSE.md',
    './CODE_OF_CONDUCT.md'
  ];

  for (let i = 0; i < filesToClean.length; i++) {
    const el = filesToClean[i];
    
    if (fs.existsSync(el)) {
      print(`${setColor(color.red)}Removed file ${el}`);
      fs.unlinkSync(el);
    }
  }
}

function defaultControllerData(name) {
  return `exports.${name} = {
    index() {
        return {
            name: 'tiksi'
        };
    }
};`
}

function defaultViewData(name) {
  return `Hello {{ name }} ! Welcome to the ${name} view.`
}

function print(str) {
  return console.log(str, setColor(color.reset));
}

function createController(name) {
  const p = path.join(__dirname, `/controllers/${name}.js`);

  if (fs.existsSync(p)) {
    print(`${setColor(color.red)}File ${p} already exist !`);
    return;
  }

  fs.writeFileSync(p, defaultControllerData(name));
}

function createView(name) {
  const p = path.join(__dirname, `/views/${name}.twig`);

  if (fs.existsSync(p)) {
    print(`${setColor(color.red)}File ${p} already exist !`);
    return;
  }

  fs.writeFileSync(p, defaultViewData(name));
}

function create() {
  const usageRappel = () => {
    print(`${setColor(color.red)}Usage: create [something] name`);
  };

  const whatCanCreate = () => {
    print(`${setColor(color.cyan)}What you can create :`);
    print(`- mvc (model view controller)`);
  };

  if (myArgs[1] == undefined) {
    usageRappel();
    whatCanCreate();
  } else {
    switch(myArgs[1]) {
      case 'mvc':
        if (myArgs[2] == undefined) {
          usageRappel();
          print(`${setColor(color.red)}Please, enter a name`)
          print(`${setColor(color.cyan)}Example : Home`)
        } else {
          const nameGiven = myArgs[2];

          const viewName = nameGiven + (/View/i.test(nameGiven) ? '' : 'View');
          const controllerName = nameGiven + (/Controller/i.test(nameGiven) ? '' : 'Controller');

          createController(controllerName);
          createView(viewName);

          print(`${setColor(color.green)}Successfully created controller ${controllerName} and view ${viewName}`);
          print(`${setColor(color.cyan)}Now, in the ./routes.json, add your route, example :`);
          print(`${setColor(color.yellow)}"home": {`);
          print(`${setColor(color.yellow)}    "path": "/${nameGiven.toLowerCase()}"`);
          print(`${setColor(color.yellow)}    "controller": "${controllerName}.index"`);
          print(`${setColor(color.yellow)}    "view": "${viewName}"`);
          print(`${setColor(color.yellow)}}`);
        }
        break;
      default:
        whatCanCreate();
        break;
    }
  }
}

function showConfig() {
  print(`${setColor(color.green)} config.json`);
  child.spawn('cat', ['./config.json'], {
    cwd: process.cwd(),
    detached: false,
    stdio: "inherit"
  });    
}

function setColor(str) {
  const format = '\033[';
  return `${format}${str}m`;
}

function run() {
  child.spawn('node', ['./src/server/server.js'], {
    cwd: process.cwd(),
    detached: false,
    stdio: "inherit"
  });
}

function help() {
  print(`${setColor(color.blue)}==================================================================`);
  print(`                     ${setColor(color.blue)}Tiksi JS - Framework`)
  print(`${setColor(color.blue)}==================================================================`);
  
  for (const instance in commands) {
    if (commands.hasOwnProperty(instance)) {
      const el = commands[instance];
      const comm = `${setColor(color.green)}${(el.cmd).replace(/\|\|/g, '  or  ')}`;
      const whspace = 30 - comm.length;
      
      let whitespace = '';

      for (let i = 0; i < whspace; i++) {
        whitespace += ' ';
      }

      print(`${comm}${whitespace}${setColor(color.white)}${el.info}`);
    }
  }

  print(`${setColor(color.blue)}==================================================================`);
}

for (const instance in commands) {
  if (commands.hasOwnProperty(instance)) {
    const element = commands[instance];
    const cmd = element.cmd;
    const cmdArr = cmd.split('||');

    let find = false;

    for (let i = 0; i < cmdArr.length; i++) {
      const el = cmdArr[i];
      
      if (myArgs[0] == el) {
        element.func();
        find = true;
        break;
      }
    }
  } else {
    help();
  }
}