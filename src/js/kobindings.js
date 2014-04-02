(function() {

    ko.bindingHandlers.currency = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {},
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = parseFloat(ko.utils.unwrapObservable(valueAccessor()));
            $(element).text("£" + value.toFixed(2));
        }
    };

})();