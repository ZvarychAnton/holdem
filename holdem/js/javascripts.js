$(document).ready(function(){
	sumPlayers = $('#playersQuantity').val();
	createDeck();
	cardDeck.shuffle();
	cardsOnBoard();
	playersHands();
	checkHands();
	write_combination();
	winners();
	getBackCardsToDeck();

	
	$('#newGame').click(function(){
		sumPlayers = $('#playersQuantity').val();
		$('#main').html('');
		cardDeck.shuffle();
		cardsOnBoard();
		playersHands();
		checkHands();
		write_combination();
		winners();
		getBackCardsToDeck();
			
	});
	$('#playersQuantity').on('keyup', function() {
		var quantity = $('#playersQuantity').val();
		var reg = /(^[2-9]{1}$|^10$)/; 
	
	 if(reg.test(quantity) == false) {
       $('#playersQuantity').val('');
      return false;
	}
		
	});
 
 
 });
 
  // создаем метод перетусовки карт
 Array.prototype.shuffle = function( b )
{
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }

 return this;
};
// сортировка чисел
function sortNumber(a, b)
{
return a - b;
}
 
// создаем колоду карт
 function createDeck(){
	cardDeck = new Array();
		for (n=2;n<=14;n++) {
			cardDeck.push([n],[n],[n],[n]);
		}
		
	for(n = 0;n<=cardDeck.length-1;n=n+4){
		cardDeck[n].suit = 'clubs';
		cardDeck[n+1].suit = 'diams';
		cardDeck[n+2].suit = 'hearts';
		cardDeck[n+3].suit = 'spades';

		}
	}	
	// перемешиваем	
	
	//cardDeck.shuffle();	!!!!!!!!!!!!!!!!!!
	
	//alert(cardDeck[0] +' '+ cardDeck[1] +' '+ cardDeck[2] +' '+ cardDeck[3] +' '+ cardDeck[4]);
	// выкладываем карты на стол
	function cardsOnBoard(){
	 flop_tern_river = new Array();
		$('#main').append('<ul id = "placeForBoard" class="table">');
		for (n=0;n<=4;n++) {
			flop_tern_river[n] = cardDeck.shift();
			
			var rank = flop_tern_river[n].toString();
			switch (rank) {
			  case '11':
				rank = new String('J');
				break
			  case '12':
				rank =  new String('Q');
				break
			  case '13':
				rank =  new String('K');
				break
				case '14':
				rank =  new String('A');
				break
			  default:
				var rank = flop_tern_river[n].toString();
			}
		
			$('#placeForBoard').append('<li><div class="card rank-'+rank.toLowerCase()+' '+flop_tern_river[n].suit+'" ><span class="rank">'+rank+'</span><span class="suit">&'+flop_tern_river[n].suit+';</span></div></li>');
		}
	}
			
		
		
	// раздаем карты игрокам	
	
	var name = 'player_';
	var result = 'result_player_'
	var player_and_board = 'player_and_board_';
	
	function playersHands(){
		for (n=1;n<=sumPlayers;n++) {
			window[name + n] = new Array();
			window[name + n][0] = cardDeck.shift();
			window[name + n][1] = cardDeck.shift();
			
			
			
			var rank_1 = window[name + n][0].toString();
			var rank_2 = window[name + n][1].toString();
			switch (rank_1) {
			  case '11':
				rank_1 = new String('J');
				break
			  case '12':
				rank_1 =  new String('Q');
				break
			  case '13':
				rank_1 =  new String('K');
				break
				case '14':
				rank_1 =  new String('A');
				break
			  default:
				var rank_1 = window[name + n][0].toString();
			}
			
			switch (rank_2) {
			  case '11':
				rank_2 = new String('J');
				break
			  case '12':
				rank_2 =  new String('Q');
				break
			  case '13':
				rank_2 =  new String('K');
				break
				case '14':
				rank_2 =  new String('A');
				break
			  default:
				var rank_2 = window[name + n][1].toString();
			}
			
			$('#main').append('<div id = "'+name + n+'"><h4>'+name + n+'<b style = "color:red" id = "winner_'+n+'"></b></h4><h4 id = "handSpan_'+n+'"></h4><h4 id = "hightCardSpan_'+n+'"></h4><ul class = "hand" style = "margin-top:-40px;margin-bottom:0px"><li><div class="card rank-'+rank_1.toLowerCase()+' '+window[name + n][0].suit+'" ><span class="rank">'+rank_1+'</span><span class="suit">&'+window[name + n][0].suit+';</span></div></li><li><div class="card rank-'+rank_2.toLowerCase()+' '+window[name + n][1].suit+'" ><span class="rank">'+rank_2+'</span><span class="suit">&'+window[name + n][1].suit+';</span></div></li></ul></div>');
			
		}
		
	}	
		
		
	
		
	
	
	
	
	// Проверка совпавших комбинаций
	function checkHands(){
	
	//формируем комбинации
	for (n=1;n<=sumPlayers;n++) {
			window[player_and_board + n] = new Array();
			window[player_and_board + n] = window[name + n].concat(flop_tern_river).sort(sortNumber).reverse();
			
			
				
		}
		
			for (n=1;n<=sumPlayers;n++) {
			window[name + n].sort(sortNumber).reverse();
			window[result + n] = new Array();
			window[result + n][0] = function() {
				//Роял флеш
				for(i=0;i<window[player_and_board + n].length-4;i++){
					var card_1 = window[player_and_board + n][i].toString();
					var card_2 = window[player_and_board + n][i+1].toString();
					var card_3 = window[player_and_board + n][i+2].toString();
					var card_4 = window[player_and_board + n][i+3].toString();
					var card_5 = window[player_and_board + n][i+4].toString();
					
					var card_1_suit = window[player_and_board + n][i].suit.toString();
					var card_2_suit = window[player_and_board + n][i+1].suit.toString();
					var card_3_suit = window[player_and_board + n][i+2].suit.toString();
					var card_4_suit = window[player_and_board + n][i+3].suit.toString();
					var card_5_suit = window[player_and_board + n][i+4].suit.toString();
				
					
					if(card_1 == 14 && card_2 == 13 && card_3 == 12 && card_4 == 11 && card_5 == 10 && card_1_suit == card_2_suit 	&& card_1_suit == card_3_suit && card_1_suit == card_4_suit && card_1_suit == card_5_suit){
					
						window[result + n][1] = window[name + n][0];
						return 9;
					}
					
				}	
				//Стрит флеш
				for(i=0;i<window[player_and_board + n].length-4;i++){
					var card_1 = window[player_and_board + n][i].toString();
					var card_2 = window[player_and_board + n][i+1].toString();
					var card_3 = window[player_and_board + n][i+2].toString();
					var card_4 = window[player_and_board + n][i+3].toString();
					var card_5 = window[player_and_board + n][i+4].toString();
					
					var card_1_suit = window[player_and_board + n][i].suit.toString();
					var card_2_suit = window[player_and_board + n][i+1].suit.toString();
					var card_3_suit = window[player_and_board + n][i+2].suit.toString();
					var card_4_suit = window[player_and_board + n][i+3].suit.toString();
					var card_5_suit = window[player_and_board + n][i+4].suit.toString();
				
					
					if(card_2 == (card_1-1) && (card_3) == (card_1-2) && (card_4) == (card_1-3) && (card_5) == (card_1-4) && card_1_suit == card_2_suit 	&& card_1_suit == card_3_suit && card_1_suit == card_4_suit && card_1_suit == card_5_suit){
						
						
						if(card_1 == window[name + n][0].toString() && card_1_suit == window[name + n][0].suit ){
							window[result + n][1] = window[name + n][0];
							return 8;
						}
						else if(card_1 == window[name + n][1].toString() && card_1_suit == window[name + n][1].suit ){
							window[result + n][1] = window[name + n][1];
							return 8;
						}
						else if(card_2 == window[name + n][0].toString() && card_2_suit == window[name + n][0].suit ){
							window[result + n][1] = window[name + n][0];
							return 8;
						}
						else if(card_2 == window[name + n][1].toString() && card_2_suit == window[name + n][1].suit ){
							window[result + n][1] = window[name + n][1];
							return 8;
						}
						else if(card_3 == window[name + n][0].toString() && card_3_suit == window[name + n][0].suit ){
							window[result + n][1] = window[name + n][0];
							return 8;
						}
						else if(card_3 == window[name + n][1].toString() && card_3_suit == window[name + n][1].suit ){
							window[result + n][1] = window[name + n][1];
							return 8;
						}
						else if(card_4 == window[name + n][0].toString() && card_4_suit == window[name + n][0].suit ){
							window[result + n][1] = window[name + n][0];
							return 8;
						}
						else if(card_4 == window[name + n][1].toString() && card_4_suit == window[name + n][1].suit ){
							window[result + n][1] = window[name + n][1];
							return 8;
						}
						else if(card_5 == window[name + n][0].toString() && card_5_suit == window[name + n][0].suit ){
							window[result + n][1] = window[name + n][0];
							return 8;
						}
						else if(card_5 == window[name + n][1].toString() && card_5_suit == window[name + n][1].suit ){
							window[result + n][1] = window[name + n][1];
							return 8;
						}
						else {	
							window[result + n][1] = 0;
							window[result + n][2] = window[name + n][0];
						 	return 8;
						}
					}
					
				}	
				// Каре
				for(i=0;i<window[player_and_board + n].length-3;i++){
					var card_1 = window[player_and_board + n][i].toString();
					var card_2 = window[player_and_board + n][i+1].toString();
					var card_3 = window[player_and_board + n][i+2].toString();
					var card_4 = window[player_and_board + n][i+3].toString();
				
					
					if(card_1 == card_2 && card_2 == card_3 && card_3 == card_4){
						if(card_1 == window[name + n][0].toString() ){
							window[result + n][1] = window[name + n][0];
							return 7;
						}
						else if(card_1 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							return 7;
						}
						else{
							window[result + n][1] = 0;
							window[result + n][2] = window[name + n][0];
							return 7;
						}
					
					}
					
				}
				// Фулл-хаус
				var countResultArray = new Array();
					countResultArray = window[player_and_board + n].slice(0);
					
					for(i=0;i<countResultArray.length-2;i++){	
					
						var card_1 = countResultArray[i].toString();
						var card_2 =countResultArray[i+1].toString();
						var card_3 =countResultArray[i+2].toString();
					
						if(card_1 == card_2 && card_2 == card_3){
							countResultArray.splice(i,3);
								for(q=0;q<countResultArray.length-1;q++){	
						
									var card_4 = countResultArray[q].toString();
									var card_5 =countResultArray[q+1].toString();
							
									if(card_4 == card_5){
									
										if(card_1 == window[name + n][0].toString()){
											window[result + n][1] = window[name + n][0];
											window[result + n][2] = window[name + n][0];
											return 6;
										}
										else if(card_1 == window[name + n][1].toString()){
											window[result + n][1] = window[name + n][1];
											window[result + n][2] = window[name + n][0];
											return 6;
										}
										else if(card_2 == window[name + n][0].toString() ){
											window[result + n][1] = window[name + n][0];
											window[result + n][2] = window[name + n][0];
											return 6;
										}
										else if(card_2 == window[name + n][1].toString() ){
											window[result + n][1] = window[name + n][1];
											window[result + n][2] = window[name + n][0];
											return 6;
										}
										else if(card_3 == window[name + n][0].toString() ){
											window[result + n][1] = window[name + n][0];
											window[result + n][2] = window[name + n][0];
											return 6;
										}
										else if(card_3 == window[name + n][1].toString() ){
											window[result + n][1] = window[name + n][1];
											return 6;
										}
										else if(card_4 == window[name + n][0].toString() ){
											window[result + n][1] = 0;
											window[result + n][2] = window[name + n][0];
											return 6;
										}
										else if(card_4 == window[name + n][1].toString() ){
											window[result + n][1] = 0;
											window[result + n][2] = window[name + n][1];
											return 6;
										}
										else if(card_5 == window[name + n][0].toString()  ){
											window[result + n][1] = 0;
											window[result + n][2] = window[name + n][0];
											return 6;
										}
										else if(card_5 == window[name + n][1].toString() ){
											window[result + n][1] = 0;
											window[result + n][2] = window[name + n][1];
											return 6;
										}
										else {	
											window[result + n][1] = 0;
											window[result + n][2] = window[name + n][0];
											return 6;
										}
									
									}
								}
						}
					}
				// Флеш
				var d=0
				var c=0
				var h=0
				var s=0
				
				for(i=0;i<window[player_and_board + n].length;i++){
					var card_1 = window[player_and_board + n][i].suit.toString();
					
					if(card_1 == 'clubs'){
					
						c++;
					}
					else if(card_1 == 'diams'){
					
						d++;
					}
					else if(card_1 == 'hearts'){
					
						h++;
					}
					else if(card_1 == 'spades'){
					
						s++;
					}
					
				}
				if(c >= 5 || d >= 5 || h >= 5 || s >= 5){
					window[result + n][1] = window[name + n][0];
					window[result + n][2] = window[name + n][0];
					return 5;
	
				}
				// Стрит	
				for(i=0;i<window[player_and_board + n].length-4;i++){
					var card_1 = window[player_and_board + n][i].toString();
					var card_2 = window[player_and_board + n][i+1].toString();
					var card_3 = window[player_and_board + n][i+2].toString();
					var card_4 = window[player_and_board + n][i+3].toString();
					var card_5 = window[player_and_board + n][i+4].toString();
				
					
					if(card_2 == (card_1-1) && (card_3) == (card_1-2) && (card_4) == (card_1-3) && (card_5) == (card_1-4)){
					
						if(card_1 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							return 4;
						}
						else if(card_1 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							return 4;
						}
						else if(card_2 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							return 4;
						}
						else if(card_2 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							return 4;
						}
						else if(card_3 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							return 4;
						}
						else if(card_3 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							return 4;
						}
						else if(card_4 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							return 4;
						}
						else if(card_4 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							return 4;
						}
						else if(card_5 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							return 4;
						}
						else if(card_5 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							return 4;
						}
						else {	
							window[result + n][1] = 0;
							window[result + n][2] = window[name + n][0];
						 	return 4;
						}
						
					}
					
				}
				// Сет
				for(i=0;i<window[player_and_board + n].length-2;i++){
					var card_1 = window[player_and_board + n][i].toString();
					var card_2 = window[player_and_board + n][i+1].toString();
					var card_3 = window[player_and_board + n][i+2].toString();
				
					
					if(card_1 == card_2 && card_2 == card_3){
					
						if(card_1 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							window[result + n][2] = window[name + n][0];
							return 3;
						}
						else if(card_1 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							window[result + n][2] = window[name + n][0];
							return 3;
						}
						if(card_2 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							window[result + n][2] = window[name + n][0];
							return 3;
						}
						else if(card_2 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							window[result + n][2] = window[name + n][0];
							return 3;
						}
						if(card_3 == window[name + n][0].toString()){
							window[result + n][1] = window[name + n][0];
							window[result + n][2] = window[name + n][0];
							return 3;
						}
						else if(card_3 == window[name + n][1].toString()){
							window[result + n][1] = window[name + n][1];
							window[result + n][2] = window[name + n][0];
							return 3;
						}
						else{
							window[result + n][1] = 0;
							window[result + n][2] = window[name + n][0];
							return 3;
						}
					
					}
					
				}
				// Две пары и пара
					var countResultArray = new Array();
					countResultArray = window[player_and_board + n].slice(0);
					
				for(i=0;i<countResultArray.length-1;i++){
					
					var card_1 = countResultArray[i].toString();
					var card_2 =countResultArray[i+1].toString();
					
					if(card_1 == card_2){
						countResultArray.splice(i,2);
									
						i= -1;
						
							
					}
					
					
				}
				//alert(countResultArray);
			/*	for(i=0;i<countResultArray.length-1;i++){
					var card_1 = countResultArray[i].toString();
						
						if(card_1 == window[name + n][1].toString() && card_1 == window[name + n][1].toString() ){
							window[result + n][1] = 0;
							window[result + n][2] = window[name + n][0];
							break;
						}
						else if(card_1 == window[name + n][1].toString() && card_1 != window[name + n][1].toString() ){
							window[result + n][1] = window[name + n][1];
							window[result + n][2] = window[name + n][1];
							
						}
						else if(card_1 != window[name + n][1].toString() && card_1 == window[name + n][1].toString() ){
							window[result + n][1] = window[name + n][0];
							window[result + n][2] = window[name + n][0];
							
						}
						else if(card_1 != window[name + n][1].toString() && card_1 != window[name + n][1].toString() ){
							window[result + n][1] = window[name + n][0];
							window[result + n][2] = window[name + n][0];
							
						}
				}*/
				
				
				
				
				
				for(i=0;i<countResultArray.length;i++){
					var card_1 = countResultArray[i].toString();
						
						if(card_1 == window[name + n][0].toString()){
							window[result + n][1] = 0;
							
							break;
						}
						else{
							window[result + n][1] = window[name + n][0];
							
							
						}
				}
				for(i=0;i<countResultArray.length;i++){
					var card_1 = countResultArray[i].toString();
						
						if(card_1 == window[name + n][1].toString()){
							window[result + n][2] = 0;
							
							break;
						}
						else{
							window[result + n][2] = window[name + n][1];
							
							
						}
				}
				/*alert(countResultArray);
					alert(window[result + n][1].toString());
					alert(window[result + n][2].toString());*/
			
				
			if(window[result + n][1] == 0 && window[result + n][2] == 0 ){
					//alert('1');
					window[result + n][1] = 0;
					
				}
			else if (window[result + n][1] == 0 && window[result + n][2] != 0 ){
					//alert('2');
					window[result + n][1] = window[name + n][1];
			}
			else if (window[result + n][1] != 0 && window[result + n][2] == 0 ){
					//alert('3');
					window[result + n][1] = window[name + n][0];
			}
			else if (window[result + n][1] != 0 && window[result + n][2] != 0 ){
					//alert('4');
					window[result + n][1] = window[name + n][0];
			}
			
			/*	if(window[result + n][1] == window[result + n][2]){
					
					window[result + n][1] = 0;
					
				}
				else if((window[result + n][1] > window[result + n][2])){
					
					window[result + n][1] = window[name + n][0];
					
				}
				else if((window[result + n][1] < window[result + n][2])){
					
					window[result + n][1] = window[name + n][1];
					
				}*/
				
			
			
				
				if(countResultArray.length == 3 || countResultArray.length == 1 ){
					window[result + n][2] = window[name + n][0];
					return 2;
				}
				else if (countResultArray.length == 5){
					window[result + n][2] = window[name + n][0];
					return 1;
				}
				else {
					window[result + n][1] = window[name + n][0];
					window[result + n][2] = window[name + n][0];
					return 0;
				}
				
			
				
			}();
	
	// Старшая карта
		//window[result + n][1] = window[name + n].sort(sortNumber).reverse()[0];
	
	}
	}
function write_combination(){
		for (n=1;n<=sumPlayers;n++) {
		var hand = window[result + n][0].toString();
		var hightCardInHand = window[result + n][1].toString();
		
			switch (hand) {
			  case '0':
				hand = new String('----');
				break
			  case '1':
				hand =  new String('Pair');
				break
			  case '2':
				hand =  new String('Two pairs');
				break
				case '3':
				hand =  new String('Three of a kind');
				break
				case '4':
				hand =  new String('Straight');
				break
				case '5':
				hand =  new String('Flush');
				break
				case '6':
				hand =  new String('Full House');
				break
				case '7':
				hand =  new String('Four of a kind');
				break
				case '8':
				hand =  new String('Straight Flush');
				break
				case '9':
				hand =  new String('Royal Flush');
				break
			 
			}
		switch (hightCardInHand) {
			  case '0':
				hightCardInHand = new String('----');
				break
				case '11':
				hightCardInHand = new String('J');
				break
			  case '12':
				hightCardInHand =  new String('Q');
				break
			  case '13':
				hightCardInHand =  new String('K');
				break
				case '14':
				hightCardInHand =  new String('A');
				break
			  default:
				var hightCardInHand = window[result + n][1].toString();
			}
		
		$('#handSpan_'+n+'').html('Hand: '+hand);
		$('#hightCardSpan_'+n+'').html('Hight card: '+hightCardInHand);
		}
	}
	
function winners(){
	// Создаем массив для определения победителя
	
	var winners_hand = new Array();
				for (n=1;n<=sumPlayers;n++) {
			winners_hand[n-1] = [(window[result + n][0])];
			winners_hand[n-1].hightCard = window[result + n][1];
			winners_hand[n-1].hightCardHand = window[result + n][2];
			winners_hand[n-1].player = n;
		}
		winners_hand.sort(sortNumber).reverse();
	
		
	//определение победителя
		if(winners_hand[0].toString() > winners_hand[1].toString()){
			
		return	$('#winner_'+winners_hand[0].player+'').html(" Winner!");
		}
		else{
				n=1
				while(n<=winners_hand.length-1){
					if(winners_hand[0].toString() == winners_hand[n].toString()){
						n++;
					}
					else{
						winners_hand.splice(n,1);
					}
				}
				
				var winners_hightCard = new Array();
				n=1
				while(n<=winners_hand.length){
					
					winners_hightCard[n-1] = [winners_hand[n-1].hightCard];
					winners_hightCard[n-1].player = winners_hand[n-1].player;
					winners_hightCard[n-1].hightCardHand = winners_hand[n-1].hightCardHand;
					
				n++;
				}
				winners_hightCard.sort(sortNumber).reverse();
				
				
				if(winners_hightCard[0].toString() > winners_hightCard[1].toString()){

				return	$('#winner_'+winners_hightCard[0].player+'').html(" Winner!");
				}
				else{
						
						n=1
						while(n<=winners_hightCard.length-1){
							if(winners_hightCard[0].toString() == winners_hightCard[n].toString()){
								n++;
							}
							else{
								winners_hightCard.splice(n,1);
							}
						}	
						
					var winners_hightCardHand = new Array();
					n=1
					while(n<=winners_hightCard.length){
						
						winners_hightCardHand[n-1] = [winners_hightCard[n-1].hightCardHand];
						winners_hightCardHand[n-1].player = winners_hightCard[n-1].player;
						
					n++;
					}
					winners_hightCardHand.sort(sortNumber).reverse();
					
					$('#winner_'+winners_hightCardHand[0].player+'').html(" Winner!");
					
						n=1
						while(n<=winners_hightCard.length-1){
						if(winners_hightCardHand[0].toString() == winners_hightCardHand[n].toString()){
							
							$('#winner_'+winners_hightCardHand[n].player+'').html(" Winner!");
							n++;
						}
						else {break;}
						 n++;
						}
				
				}

			}			
			
				
			
		}
	
		
	
	
	
	function getBackCardsToDeck(){
		cardDeck = cardDeck.concat(flop_tern_river);
		for (n=1;n<=sumPlayers;n++){
		
		cardDeck = cardDeck.concat(window[name + n]);
		}
		}
	
	
