const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.size() == this.maxSize) {
			throw new Error('The queue has max size');
		}
		this.heap.push(data, priority);
	}

	shift() {
		if(this.heap.heapSize == 0) {
			throw new Error('The queue is empty');
		}
		let priorityValue = this.heap.pop();
		return priorityValue;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
