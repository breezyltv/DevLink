export const domains = [
  "gmail.com",
  "aol.com",
  "att.net",
  "comcast.net",
  "facebook.com",
  "hotmail.com",
  "live.com",
  "outlook.com",
  "icloud.com"
];
export const popularFrameworks = [
  "DotNet",
  "RubyOnRails",
  "React.js",
  "Vue.Js",
  "Angular",
  "SpringBoot",
  "Laravel",
  "Node.js",
  "Django",
  "Bootstrap",
  "Antdesign",
  "MaterialUi",
  "Socket.Io",
  "Ionic",
  "Flutter",
  "Pytorch",
  "Electron",
  "Tensorflow",
  "Reactivex",

  "Meteor",
  "Wordpress",
  "Codeigniter",
  "Zendframework",
  "Magento",
  "Sass",

  "StyledComponents"
];

export const popularLanguages = [
  "Java",
  "Javascript",
  "Typescript",
  "C++",
  "Python",
  "C#",
  "PHP",
  "Go",
  "Swift",
  "Html5",
  "CSS3",
  "Microsoftsqlserver",
  "Mysql",
  "Postgresql",
  "C",
  "Kotlin",
  "Scala",
  "R",
  "Dart"
];

export const popularTools = [
  "Docker",
  "Kubernetes",
  "Postman",
  "Github",
  "Expo",
  "Webpack",
  "Trello",
  "Circleci",
  "Firebase",
  "Jest",
  "Amazonaws",
  "Heruko",
  "Mongodb",
  "Oracle",
  "Yarn",
  "Npm",
  "Visualstudiocode",
  "Androidstudio",
  "Xcode",
  "Intellijidea",
  "Framer",
  "Nginx",
  "Cloudflare",
  "Apache",
  "Jupyter",
  "Linux",
  "Adobelightroom",
  "Adobephotoshop"
];

export const upperFirstChar = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

//handle validation from backend
export const validateStatus = (errors, errorStatus) => {
  let status = {};
  if (errors && errorStatus) {
    status = {
      validateStatus: "error",
      help: errors
    };
  }

  return status;
};
