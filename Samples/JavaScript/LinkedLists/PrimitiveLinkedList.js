//  closure
var toExport;

//  keep all of this private
(function private () {
    var _linkedListAdd = function (val) {
        if (val === undefined || val === null || typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
            let node = Node(val);

            if (this.head === undefined) {
                this.head = node;
                this.tail = node;
            } else {
                this.tail.next = node;
                this.tail = node;
            }
        } else {
            throw 'Can only add Primitives to this LinkedList';
        }
    };

    var _linkedListRemove = function (val) {
        var isFound;

        if (this.head === undefined) {
            //  list is empty
            isFound = false;
        } else if (this.head.value === val) {
            //  item to remove was head node
            isFound = true;

            if (this.head.next !== undefined) {
                let next = this.head.next;
                delete this.head;
                this.head = next;
            } else {
                delete this.head;
                this.head = undefined;
                this.tail = undefined;
            }
        } else if (this.head.next !== undefined) {
            //  list longer than one, but item wasn't found at the head
            let previous = this.head;
            let current = previous.next;

            while (current !== undefined) {
                let next = current.next;
                if (current.value === val) {
                    isFound = true;

                    if (next !== undefined) {
                        //  value found mid-list
                        delete current;
                        previous.next = next;
                    } else {
                        //  value found at tail
                        delete current;
                        this.tail = previous;
                    }

                    break;  //  while
                }

                previous = current;
                current = next;
            }
        } else {
            //  item not found
            isFound = false;
        }

        return isFound;
    };

    var _linkedListReverse = function () {
        //  no need to reverse empty or single-item lists
        if (this.head !== undefined && this.head.next !== undefined) {
            let previous = this.head;
            let current = previous.next;

            if (current.next !== undefined) {
                while (current !== undefined) {
                    let next = current.next;

                    current.next = previous;

                    previous = current;
                    current = next;
                }
            } else {
                current.next = previous;
            }

            let head = this.head;
            let tail = this.tail;
            this.head = tail;
            this.tail = head;
            this.tail.next = undefined;
        }
    };

    var _linkedListIsEmpty = function () {
        return (this.head === undefined);
    };

    var _linkedListClear = function () {
        if (!this.isEmpty()) {
            let current = this.head;

            while (current.next !== undefined) {
                let next = current.next;
                delete current;
                current = next;
            }

            delete current;
            this.head = undefined;
            this.tail = undefined;
        }
    };



    var Node = function (val) {
        var node = {
            value: val  //  initialize
        };

        return node;
    };

    var PrimitiveLinkedList = function (val) {
        var linkedList = {};

        //  methods
        linkedList.add = _linkedListAdd;
        linkedList.remove = _linkedListRemove;
        linkedList.reverse = _linkedListReverse;
        linkedList.isEmpty = _linkedListIsEmpty;
        linkedList.clear = _linkedListClear;

        //  initialize
        if (Array.isArray(val)) {
            let len = val.length;
            let i = 0;

            for (i; i < len; i++) {
                linkedList.add(val[i]);
            }
        } else {
            linkedList.add(val);
        }

        return linkedList;
    };

    //  Assign export to closure
    toExport = PrimitiveLinkedList;
})();

//  Assign closure to global object
this.PrimitiveLinkedList = toExport;
