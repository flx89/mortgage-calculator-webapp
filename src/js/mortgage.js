(function(global) {

    "use strict";

    var Payment = (function() {

        function Payment(interest, payment, balance, overpayment, month) {
            this.interest = interest;
            this.payment = payment;
            this.balance = balance;
            this.overpayment = overpayment;
            this.month = month;
        }

        Payment.prototype.total = function() {
            return interest + principal;
        };

        return Payment;

    })();

    function toMonthlyRate(rate) {
        return rate / (12 * 100);
    }

    function toMonthlyPayments(years) {
        return years * 12;
    }

    function monthlyPayment(pricipal, rate, years) {
        var monthlyRate = toMonthlyRate(rate);
        var monthlyPayments = toMonthlyPayments(years);
        return pricipal * (monthlyRate / (1 - Math.pow((1 + monthlyRate), -1 * monthlyPayments)));
    }

    function schedule(principal, rate, years, overpayment) {

        var remaining = principal,
            monthlyRate = toMonthlyRate(rate),
            payment = monthlyPayment(principal, rate, years),
            month = 0,
            totalMonths = years * 12,
            payments = [],
            interest,
            principalPayment,
            over;

        overpayment = overpayment == null ? 0 : overpayment;

        while (month++ < totalMonths) {
            interest = remaining * monthlyRate;
            principalPayment = Math.min(payment - interest, remaining);
            remaining -= principalPayment;
            over = Math.min(overpayment, remaining);
            remaining -= over;
            payments.push(new Payment(interest, principalPayment, remaining, over, month));
            if (Math.abs(remaining) < 0.01) break;
        }

        return payments;
    }

    var MortgageCalculator = (function() {

        function MortgageCalculator(principal, rate, years) {
            this.principal = principal;
            this.rate = rate;
            this.years = years;
        }

        MortgageCalculator.prototype.monthlyPayment = function() {
            return monthlyPayment(this.principal, this.rate, this.years);
        };

        MortgageCalculator.prototype.schedule = function(overpayment) {
            return schedule(this.principal, this.rate, this.years, overpayment);
        };

        return MortgageCalculator;

    })();

    global.mortgageCalculator = function(pricipal, rate, years) {
        return new MortgageCalculator(pricipal, rate, years);
    };

})(this);