var initialData = [
  { id: 'bomb', icon: '💣', name: 'Bomb', amount: 4 },
  { id: 'sword', icon: '🗡', name: 'Sword', amount: 12 },
  { id: 'chocolate', icon: '🍫', name: 'Chocolate', amount: 7 },
];

var icons = {
  sword: '🗡',
  chocolate: '🍫',
  chips: '🍿',
  egg: '🥚',
  bone: '🦴',
  bomb: '💣',
};

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
      icon: icons[newItem.icon],
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
