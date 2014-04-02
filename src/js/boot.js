$(document).ready(function() {

    "use strict";

    var model,
        disposables = [],
        selectInterest = mapWith()(function(v) { return v.interest; }),
        selectPayment = mapWith()(function(v) { return v.payment; }),
        selectOverpayment = mapWith()(function(v) { return v.overpayment; }),
        colours = colourSelector();

    model = {
        schedule: ko.observableArray([]),
        repayment: ko.observable(0),
        cumulativeInterest: ko.observable(0),
        cumulativePayment: ko.observable(0),
        cumulativeOverpayment: ko.observable(0),
        total: ko.observable(0),
        monthlyPayment: ko.observable(0),
        amount: ko.observable(),
        overpayment: ko.observable(),
        interestSavings: ko.observable(0),
        rate: ko.observable(),
        period: ko.observable(),
        calculate: load
    };

    ko.applyBindings(model);

    function load() {

        var calc = mortgageCalculator(model.amount(), model.rate(), model.period()),
            interest,
            schedule,
            cInterest,
            cPayments,
            cOverPayment,
            overpayment;

        model.monthlyPayment(calc.monthlyPayment());
        model.overpayment(parseFloat(model.overpayment() || 0));

        schedule = calc.schedule(model.overpayment());
        model.schedule(schedule);

        cInterest = selectInterest(schedule).reduce(accumulator);
        cPayments = selectPayment(schedule).reduce(accumulator);
        cOverPayment = selectOverpayment(schedule).reduce(accumulator);
        interest = transform(function(v) { return { value: v }; })(cInterest, cPayments, cOverPayment);

        model.cumulativeInterest(cInterest);
        model.cumulativePayment(cPayments);
        model.cumulativeOverpayment(cOverPayment);
        model.total(cInterest + cPayments + cOverPayment);
        model.interestSavings(selectInterest(calc.schedule()).reduce(accumulator) - cInterest);

        disposables.forEach(dispose), disposables = [];
        disposables.push(Charts.pie("#interest", interest, dataSelector, colours));
    }

    function dispose(disposable) {
        disposable();
    }

    function accumulator(acc, v) {
        return acc + v;
    }

    function mapWith() {
        return flip(Array.prototype.map);
    }

    function flip(fn) {
        return function(first) {
            return function(second) {
                return fn.call(second, first);
            }
        }
    }

    function dataSelector(v, i) {
        return v.value;
    }

    function colourSelector() {
        var colours = "one two three".split(" ");
        return function(v, i) {
            return colours[i];
        }
    }

    function transform(tranformation) {
        return function() {
            return Array.prototype.slice.call(arguments, 0).map(tranformation);
        }
    }
});