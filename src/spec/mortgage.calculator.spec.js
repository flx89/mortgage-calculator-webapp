describe("Tests the mortgage calculator", function() {

    it("Mortgage calculator should be defined", function() {

        expect(mortgageCalculator).toBeDefined();
    });

    it("Mortgage calculator should calculate the monthly payment correctly", function() {

        var monthlyPayment = mortgageCalculator(139000, 2.69, 25).monthlyPayment();
        expect(monthlyPayment - 636.96).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate first interest payment correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[0].interest - 311.59).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate first principal payment correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[0].payment - 325.37).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate first balance correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[0].balance - 138674.63).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate first month correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[0].month).toBe(1);
    });

    it("Mortgage calculator should calculate first overpayment correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule(500);
        expect(schedule[0].overpayment).toBe(500);
    });

    it("Mortgage calculator should calculate first balance with overpayment correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule(500);
        expect(schedule[0].balance - 138174.63).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate last interest payment correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[schedule.length - 1].interest - 1.42).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate last principal payment correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[schedule.length - 1].payment - 635.54).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate last balance payment correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[schedule.length - 1].balance).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate last month correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule();
        expect(schedule[schedule.length - 1].month).toBe(300);
    });

    it("Mortgage calculator should calculate last month with overpayments correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule(500);
        expect(schedule[schedule.length - 1].month).toBe(144);
    });

    it("Mortgage calculator should calculate last principal with overpayments correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule(500);
        expect(schedule[schedule.length - 1].payment - 42.41).toBeLessThan(0.01);
    });

    it("Mortgage calculator should calculate last balance with overpayments correctly", function() {

        var schedule = mortgageCalculator(139000, 2.69, 25).schedule(500);
        expect(schedule[schedule.length - 1].balance).toBeLessThan(0.01);
    });
});