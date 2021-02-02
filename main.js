var initialData = [
  { id: 'bone', icon: 'icon-bone', name: 'Bone', amount: 1 },
  { id: 'ball', icon: 'icon-ball', name: 'Ball', amount: 2 },
  { id: 'circle', icon: 'icon-circle', name: 'Circle', amount: 3 },
  { id: 'rabbit', icon: 'icon-rabbit', name: 'Rabbit', amount: 4 },
];

function InventoryViewModel() {
  var self = this;

  // State
  self.name = ko.observable('').extend({
    required: true,
  });
  self.icon = ko.observable('bone');
  self.amount = ko.observable().extend({
    required: true,
    min: 1,
  });
  self.items = ko.observableArray(initialData);

  // Add new item
  self.addItem = function (newItem) {
    if (!newItem) return;

    self.items.push({
      id: generateId(),
      name: newItem.name,
      icon: newItem.icon,
      amount: newItem.amount,
    });
  };

  // Remove item
  self.removeItem = function (item) {
    self.items.remove(item);
  };

  // Submit the form
  self.handleSubmit = function () {
    var errors = ko.validation.group(self);

    console.log(errors);
    if (errors().length > 0) {
      errors.showAllMessages();
      return;
    }

    self.addItem({
      name: self.name(),
      icon: self.icon(),
      amount: self.amount(),
    });
  };
}

ko.applyBindings(new InventoryViewModel(), document.querySelector('#root'));

/**
 * Very simple id generator, doesn't guarantee uniqueness, but it's
 * absolutely fine for this simple example.
 */
function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}
