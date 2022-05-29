module.exports = class ArgParser {
	constructor(args) {
		this.args = args
	}
	getValue(key) {
		const keyIndex = this.args.indexOf(key)
		if (keyIndex != -1 && this.args.length > keyIndex) {
			return this.args[keyIndex+1]
		} else {
			return null;
		}
	}
}