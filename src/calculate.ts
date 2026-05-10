import type {TimedCashFlow} from './calculator-type.ts'
export class Calculate {

    static npv(cashFlows: TimedCashFlow[], i: number): number {


        const reducer: (accumulator: any, currentValue: TimedCashFlow) => any = (accumulator: any, currentValue: TimedCashFlow)=> {
            return accumulator +  currentValue.amount / Math.pow(1 + i, currentValue.time);
        }

        return cashFlows.reduce(reducer, 0);
    }

    static sum(cashFlows: TimedCashFlow[]): number {

        return cashFlows.reduce((acc, cashFlow) => acc + cashFlow.amount, 0);
    }

    static irr(cashFlows: TimedCashFlow[], precision: number = 0.0001, guessRate: number = 1,  iterationLimit: number = 1000) {
        let floorRate =  0;
        let ceilRate =  guessRate;
        let iteration = 0;

        let amountSum = this.sum(cashFlows);
        if (amountSum < 0) {
            floorRate = -1;
            ceilRate = (ceilRate < 0 ? ceilRate : 0);
        }
        let rate: number = (guessRate > floorRate ? guessRate : floorRate);
        rate = (rate < ceilRate ? rate : ceilRate);

        let npv = this.npv(cashFlows, rate);
        iteration++;

        if (Math.abs(npv) <= precision) {
            return rate;
        } else if (npv > 0) {

            while(npv > 0) {
                iteration++;
                floorRate = rate;
                rate   +=  Math.pow(2.0, iteration);
                npv = this.npv(cashFlows, rate);

                console.log("npv:" + npv + " ,rate: " + rate + " ,iteration: " + iteration);

                if (Math.abs(npv) <= precision) {
                    return rate;
                }
                if (iteration > iterationLimit) {
                    return -1;
                }
            }
            ceilRate = rate;
        } else if (npv < 0) {
            while(npv < 0) {
                iteration++;
                ceilRate = rate;
                rate   =  (floorRate + rate)/2;
                npv = this.npv(cashFlows, rate);

                console.log("npv:" + npv + " ,rate: " + rate + " ,iteration: " + iteration);
                if (Math.abs(npv) <= precision) {
                    return rate;
                }
                if (iteration > iterationLimit) {
                    return -1;
                }
            }
            floorRate = rate;
        }

        while (Math.abs(npv) > precision) {

            iteration++;
            rate =  (floorRate + ceilRate) / 2;
            npv = this.npv(cashFlows, rate);

            if (Math.abs(npv) <= precision) {
                return rate;
            } else if (npv > 0) {
                floorRate = rate;
            } else if (npv < 0) {
                ceilRate = rate;
            }

            console.log("npv:" + npv + " ,rate: " + rate + " ,iteration: " + iteration);
            if (iteration > iterationLimit) {
                return -1;
            }
        }
        return rate;
    }

}