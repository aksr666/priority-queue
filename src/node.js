class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(!this.left) {
			this.left = node;
		} else if(!this.right) {
			this.right = node;
		}
		node.parent = this;
		return this;
	}

	removeChild(node) {
		if(this.left === node) {
			this.left.parent = null;
			this.left = null;
		} else if(this.right === node) {
			this.right.parent = null;
			this.right = null;
		} else {
			throw new Error('node is undefined');
	    }
		return this;
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		  }
		  return this;
	  }

	swapWithParent() {
		if(this.parent) {
			let temp;
			if(this.left) {
				this.left.parent = this.parent;
			} if(this.right) {
				this.right.parent = this.parent;
			}		
			if(this.parent.left === this) {
				if(this.parent.right) {
					this.parent.right.parent = this;				
				}
			temp = this.right;
			this.right = this.parent.right;
			this.parent.right = temp;
			temp =  this.left;
			this.left = this.parent;
			this.parent.left = temp;
			} else { 
				if(this.parent.right === this) {
					if(this.parent.left) {
						this.parent.left.parent = this;
					}
					temp = this.left;
					this.left = this.parent.left;
					this.parent.left = temp;
					temp = this.right;
					this.right = this.parent;
					this.parent.right = temp;
				}
			}
			if(this.parent.parent) {
				if(this.parent.parent.left === this.parent) {
					 this.parent.parent.left = this;
				} else {
					this.parent.parent.right = this;
				}
			}
			temp = this.parent;
			this.parent = this.parent.parent;
			temp.parent = this;
		}
		return this;
	}
}




module.exports = Node;
