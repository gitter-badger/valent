export default class RouteException {
  constructor(name) {
    this.name = name;
  }

  getMessage(message) {
    return `route "${this.name}": ${message}`;
  }

  noUrlBuilder() {
    var message = this.getMessage(`Url builder is not available. Url build could be set using @urlBuilder method
    or could be auto generated if there is at least one url is attached to route`);

    return new Error(message);
  }

  wrongTemplate() {
    var message = this.getMessage('@template should be a String or Function');
    return new Error(message);
  }

  wrongTemplateUrl() {
    var message = this.getMessage('@templateUrl should be a String');
    return new Error(message);
  }

  wrongUrlParams() {
    var message = this.getMessage('Params for default url builder should be an object');
    return new Error(message);
  }

  templateUrlAlreadyExists() {
    var message = this.getMessage('There are could be only one attribute @template or @templateUrl. @template already exists');
    return new Error(message);
  }

  templateAlreadyExists() {
    var message = this.getMessage('There are could be only one attribute @template or @templateUrl. @templateUrl already exists');
    return new Error(message);
  }

  noTemplateOrTemplateUrl() {
    var message = this.getMessage('There are no template or templateUrl');
    return new Error(message);
  }

  // -----------------------------------------

  wrongAddResolverArguments() {
    var message = this.getMessage(`Wrong resolve arguments. Should be a two (key, value) arguments or one object. Resolver - only function`);
    return new Error(message);
  }

  wrongSetResolversArguments() {
    var message = this.getMessage(`Wrong resolve arguments. Should be a two (key, value) arguments or one object. Resolver - only function`);
    return new Error(message);
  }

  // ------------------------------------------

  wrongAddOptionArguments() {
    var message = this.getMessage('Wrong options arguments. Should be a two (String key, Any value) arguments');
    return new Error(message);
  }

  wrongSetOptionsArguments() {
    var message = this.getMessage('Wrong options arguments.Should be on argument type object');
    return new Error(message);
  }

  // ------------------------------------------

  routeChangeErrorIsNotFunction() {
    var message = this.getMessage('Callback for route change error should be a function');
    return new Error(message);
  }

  wrongUrlFormat(url) {
    var message = this.getMessage(`Valent does not support url helpers like "?" and "*" at current version. Url: "${url}"`);
    return new Error(message);
  }

  wrongOtherwise(url) {
    var message = this.getMessage(`Wrong otherwise config`);
    return new Error(message);
  }
}
