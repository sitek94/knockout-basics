function ExampleViewModel() {
  var self = this;

  self.title = ko.observable('Hello World!');
}

ko.applyBindings(new ExampleViewModel(), document.querySelector('#root'));
