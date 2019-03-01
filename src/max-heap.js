const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		const newNode = new Node(data, priority);
		this.heapSize += 1;
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() { 
		if(this.heapSize !== 0) {
			this.heapSize--;
			let data = this.root;
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			if(this.heapSize !== 0) {
				this.shiftNodeDown(this.root);
			}
			return data.data;
		}
	}

	detachRoot() {
		let rootIndex = this.parentNodes.indexOf(this.root)
		let root;
		if(rootIndex !== -1) {
			this.parentNodes.splice(rootIndex, 1);
		}
		root = this.root;
		this.root = null;
		return root;
	}
	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes.pop();
		if(lastNode) {
			if(lastNode.parent && lastNode.parent.right === lastNode && lastNode.parent !== detached) {
				this.parentNodes.unshift(lastNode.parent);
			}
			if(lastNode.parent) {
				lastNode.parent.removeChild(lastNode);
			}
			lastNode.left = detached.left;
			lastNode.right = detached.right;
			if(lastNode.left) {
				lastNode.left.parent = lastNode;
			}
			if(lastNode.right) {
				lastNode.right.parent = lastNode;
			}
			if(!lastNode.left || !lastNode.right) {
				this.parentNodes.unshift(lastNode);
			}
			this.root = lastNode;	
		}				
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.heapSize == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes.splice(0, this.parentNodes.length);
		this.heapSize = 0;
	}

	insertNode(node) {
		if(!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
			if(this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if(node.parent) {
			if(node.parent.priority < node.priority) {
				let nodeIndex = this.parentNodes.indexOf(node);
				let parentIndex = this.parentNodes.indexOf(node.parent);
				if(nodeIndex !== -1) {
					if(parentIndex !== -1) {
						let temp = this.parentNodes[nodeIndex];
						this.parentNodes[nodeIndex] = this.parentNodes[parentIndex];
						this.parentNodes[parentIndex] = temp;
					}else {
						this.parentNodes[nodeIndex] = node.parent;
					}
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		let temp;
		if(node.left && node.right) {
			if(node.left.priority >= node.right.priority && node.left.priority > node.priority) {
				temp = node.left;
			} else if(node.right.priority > node.left.priority && node.right.priority > node.priority) {
				temp = node.right;
			}
		}else if(node.left && node.left.priority > node.priority) {
			temp = node.left;
		}else if(node.right && node.right.priority > node.priority) {
			temp = node.right;
		}else {
			return;
		}
		let parentIndex = this.parentNodes.indexOf(node);
		let childIndex = this.parentNodes.indexOf(temp);
		if(parentIndex !== -1) {
			this.parentNodes[parentIndex] = temp;
			this.parentNodes[childIndex] = node;
		}else {
			this.parentNodes[childIndex] = node;
		}
		if(node == this.root) {
			this.root = temp;
		}	
		temp.swapWithParent();
		this.shiftNodeDown(node);			
	}
}

module.exports = MaxHeap;



