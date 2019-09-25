export default class Util {

    static readonly DEFAULT_STEP = 10;
    static readonly MAX_SEG_WIDTH = 100;

    static segmentationFunction(n: number) {
        
        if(n == 0)
            return 1;
        else if(n == 1)
            return 2;
        else if(n == 2)
            return 4;
        else 
            return 10 * Util.segmentationFunction(n - 3);
    }

    static closestDenominator(range: number) {

        //for(var i = 0; Util.segmentationFunction(i) < range; i = Util.segmentationFunction(i));

        var i = 0;

        while(Util.segmentationFunction(i) < range) {
            i = Util.segmentationFunction(i);
        }

        return i; 
    }

    static initSegmentation(containerWidth: number) {

        var i = 0;

        while((containerWidth / Util.segmentationFunction(i)) > this.MAX_SEG_WIDTH) {
            i++
        }

        let segs = Util.segmentationFunction(i);

        //for(var i = 0; (containerWidth / i) > this.MAX_SEG_WIDTH; i = Util.segmentationFunction(i));

        return {
            count: segs,
            width: containerWidth / segs
        }; 
    }

    static getSegmentsWidth(factor: number): number {
        return Util.MAX_SEG_WIDTH;
    }

    static getSegments(from: number, to: number, step: number): Array<number> {

        let result: Array<number> = [];
        let first = from - (from % step);

        for(; first < to; first += step) 
            result.push(first)
        
        return result;
    }
}