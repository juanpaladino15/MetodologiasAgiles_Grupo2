class TokenList{
	constructor(iamhost,iamport){
		this.tokens = new Array
	}

	add(token){
		this.tokens.push(token)
	}

	findToken(token){
		var aToken = me.tokens.find(t=> t.token == token)
		return aToken
	}
}

module.exports = { TokenList }
