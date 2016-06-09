/**
 * @module josephus
 * 
 * @summary
 * A simple module which generalizes the Josephus Problem using an array
 * implementation.
 * 
 * @description
 * How To:
 * To run this module directly from file with Node.js:
 *   - From command line:
 *         cd /to/directory/with/this/file
 *         node
 *         var josephus = require('./josephus');
 *         josephus.josephus(40, 0, 1, 1);  //16
 * 
 * To use this module in another Node.js module or project:
 *   - Add josephus.js to an appropriate "node_modules" directory in your
 *     in your project (such as at the project root).
 *   - Then, in code:
 *         var josephus = require('josephus');
 *         josephus.josephus(40, 0, 1, 1);  //16
 * 
 * For usage specifics, please see {@link josephusArray}.
 * 
 * To run unit tests:
 *   - From command line:
 *         cd /to/directory/with/this/file
 *         node test josephus.js
 * 
 * Background:
 * The Josephus Problem is a well-known mathematical puzzle based upon an 
 * account given by a 1st century Jewish historian named Flavius Josephus about 
 * his participation in the events surrounding the Jewish revolt of 66-70 CE 
 * against Roman rule. In the account, Josephus as a Jewish general held the 
 * fortress of Jotapata for 47 days, but after the fall of the city he claimed 
 * to have taken refuge with some 40 zealots in a cave. Fearing defeat more
 * than death the zealots resolved themselves to suicide.
 * 
 * In one version of the story, the zealots only had a single sword with them 
 * in the cave. So, they stood in a circle and drew lots. The winner took the 
 * only sword and killed the man on his left, then passed the sword to the next 
 * man on his left who repeated the process. Josephus, being a wise man, 
 * determined where to stand in the circle in order to be the last man to be 
 * handed the sword. Josephus then convinced the other remaining zealot to 
 * surrender with him to the Romans. Thus, Josephus lived to tell the tale.
 * 
 * In some versions of the story, every third zealot is killed instead. Still 
 * other versions have varying methods the zealots contrived for their demise. 
 * Some versions of the puzzle have well known solutions. For example: if we 
 * have n zealots labeled 0 through n-1, with the 0-zealot holding the sword 
 * initially, who kills the immediate zealot on his left, passes the sword to 
 * the next zealot on his left, and the process continues; then calculating the 
 * safe position to stand in has a known mathematical algorithm.
 * 
 * Here, I have generalized the problem to allow for not only a variable number 
 * of zealots (n), but variation in where the sword begins (instead of always 
 * 0), how many zealots to count and in which direction when killing (instead 
 * of always the one on the left), and how many zealots to count and in which 
 * direction when passing the sword (instead of always to the one on the left). 
 * To do this I had to make one more assumption: the zealot holding the sword 
 * never counts himself when determining who to kill or to whom he should pass 
 * the sword.
 * 
 */

/**
 * @function josephus
 * Alias for {@link josephusArray}
 */

 /**
 * @function josephusArray
 * An array-based implementation of solving a more generic version of the 
 * Josephus Problem.
 * 
 * @param num_zealots
 * The number of zealots trapped in the cave (including Josephus).
 * Must be three or greater.
 * 
 * @param sword_start
 * The index of the zealot which begins with the sword.
 * Must be between zero and {@link num_zealots}-1, inclusive.
 * 
 * @param kill_count
 * The sword-bearer counts this many living zealots to the left (negative to 
 * the right) and kills the resulting zealot.
 * Must be a non-zero integer.
 * 
 * @param sword_count
 * The sword-bearer then counts this many living zealots to the left (negative 
 * to the right) and passes the sword to the resulting zealot.
 * Must be a non-zero integer.
 * 
 * @return
 * Negative one indicates malformed input.
 * Zero or a positive integer indicates the index of the last zealot to hold 
 * the sword (or Josephus).
 */
var josephusArray = function (num_zealots, sword_start, kill_count, sword_count) {
    //state vars
    var zealot_circle = [];
    var num_living;
    var sword_index;

    //calculation vars
    var valid_input = true;
    var next_sword_index;
    var kill_index;

    //private
    var initialize_josephus = function () {
        var i;

        //create the circle
        for (i = 0; i < num_zealots; i++) {
            zealot_circle[i] = 1; //living
        }
        num_living = num_zealots;

        //place the sword
        zealot_circle[sword_start] = 2; //sword-bearer
        sword_index = sword_start;
    };

    //private
    var increment_index = function (index) {
        var next_index = index + 1;

        //index bounding
        if (next_index === num_zealots) {
            next_index = 0;
        }

        return next_index;
    };

    //private
    var decrement_index = function (index) {
        var next_index = index - 1;

        //index bounding
        if (next_index < 0) {
            next_index = num_zealots - 1;
        }

        return next_index;
    }

    //private
    var get_next_zealot = function (skip) {
        var index = sword_index;
        var zealots_to_skip;
        var zealots_skipped = 0;
        var change_index;

        //set correct direction
        if (skip > 0) {
            change_index = increment_index;
            zealots_to_skip = skip;
        } else {
            change_index = decrement_index;
            zealots_to_skip = skip * -1;
        }

        //scan zealot circle
        while (zealots_skipped !== zealots_to_skip) {
            index = change_index(index);

            //the zealot holding the sword never counts himself
            if (zealot_circle[index] === 1) {
                zealots_skipped++;
            }
        }

        //index of the next living zealot
        return index;
    };

    //verify input
    if (num_zealots < 3) {
        valid_input = false;
    } else if (sword_start < 0 || sword_start >= num_zealots) {
        valid_input = false;
    } else if (kill_count === 0) {
        valid_input = false;
    } else if (sword_count === 0) {
        valid_input = false;
    }

    if (valid_input === true) {
        initialize_josephus();

        //iterate
        while (num_living !== 2) {
            //kill
            kill_index = get_next_zealot(kill_count);
            zealot_circle[kill_index] = 0;
            num_living--;

            //pass the sword
            next_sword_index = get_next_zealot(sword_count);
            zealot_circle[next_sword_index] = 2;
            zealot_circle[sword_index] = 1;
            sword_index = next_sword_index;
            next_sword_index = null;
        }

        //last sword-bearer
        return sword_index;
    } else {
        //Bad input
        return -1;
    }
};

 /**
 * @function josephus
 * Alias for {@link josephusArray}
 */
var josephus = josephusArray;

//Export as module if executed by Node.js
if (typeof window === 'undefined') {
    exports.josephus = josephusArray;
    exports.josephusArray = josephusArray;
}