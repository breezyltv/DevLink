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

export const randomColor = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple"
];

export const commonTags = [
  "Alerts",
  "Angular",
  "Angular 2",
  "Directive",
  "Angular UI Router",
  "AngularJS",
  "Animation",
  "ASP.NET",
  "CoreASP.NET Web API",
  "Authentication and Authorization",
  "AWS",
  "Axios",
  "Azure",
  "Basic Authentication",
  "Blazor",
  "Bootstrap",
  "C#",
  "Chai",
  "CKEditor",
  "CSS3",
  "DDD",
  "Deployment",
  "Design Patterns",
  "Dynamic",
  "LINQ",
  "EF",
  "Core",
  "ELMAH",
  "ES6",
  "Exchange",
  "Facebook",
  "Fetch",
  "Fluent",
  "NHibernate",
  "Formik",
  "Google",
  "Analytics",
  "Google API",
  "Google Maps API",
  "Heroku",
  "HTML5",
  "HTTP",
  "IIS",
  "Insecure Content",
  "Instagram API",
  "Ionic Framework",
  "iOS",
  "iPhone",
  "JavaScript",
  "jQuery",
  "JWT",
  "LinkedIn",
  "LINQ",
  "Login",
  "MEAN Stack",
  "MERN Stack",
  "MEVN Stack",
  "Mocha",
  "Modal",
  "MongoDB",
  "Moq",
  "MVC",
  "MVC5",
  "MySQL",
  "NGINX",
  "ngMock",
  "NHibernate",
  "Ninject",
  "NodeJS",
  "npm",
  "Pagination",
  "Pinterest",
  "Razor",
  "Pages",
  "Reactjs",
  "React Hooks",
  "Redmine",
  "React-Redux",
  "Registration",
  "Repository",
  "RxJS",
  "Security",
  "Sequelize",
  "Shell Scripting",
  "SinonJS",
  "SSH",
  "TDD",
  "Terraform",
  "Twitter",
  "TypeScript",
  "Ubuntu",
  "Umbraco",
  "Unit of Work",
  "Unit Testing",
  "URL Rewrite",
  "Validation",
  "Vuejs",
  "Vuex",
  "Webpack",
  "Windows Server 2008"
];

export const profileStatus = [
  "Developer",
  "Junior Developer",
  "Senior Developer",
  "Manager",
  "Student or Learning",
  "Instructor or Teacher",
  "Intern",
  "Other"
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

export const randomChoice = arr => {
  return arr[Math.floor(arr.length * Math.random())];
};

export const randomChoiceArr = (arr, num) => {
  let randomArr = [];
  for (let i = 0; i < num; i++) {
    randomArr.push(arr[Math.floor(arr.length * Math.random())]);
  }
  return randomArr;
};

export const upperCaseString = str => {
  return str
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
