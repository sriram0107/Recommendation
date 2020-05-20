
document.getElementById('Music').style.display = "none";
			document.getElementById('Movie').style.display = "none";
			document.getElementById('SubmitButton').style.display = "none";

			var checkedActivities = [];

			$('input:checkbox').change(function() {
				var value = $(this).val();
				if ($(this).prop('checked')) {
					checkedActivities.push(value);
					if(value.localeCompare("Music")==0) {
						document.getElementById('Music').style.display = "inline";
					}
					else if(value.localeCompare("Movie")==0) {
						document.getElementById('Movie').style.display = "inline";
					}
				}
				else {
					var index = checkedActivities.indexOf(value);
					if(index != -1) {
						checkedActivities.splice(index, 1);
						if(value.localeCompare("Music")==0) {
							document.getElementById('Music').style.display = "none";
						}
						else if(value.localeCompare("Movie")==0) {
							document.getElementById('Movie').style.display = "none";
						}
					}
				}
	
				if(checkedActivities.length==0) {
					document.getElementById('SubmitButton').style.display = "none";
				}
				else {
					document.getElementById('SubmitButton').style.display = "inline";
				}
			});

			$('input[type=submit]').on('click', function(e) {
				var message = "";
				if (window.getComputedStyle(document.getElementById('Music')).display !== "none") {
					if($('input[name="music_genre"]').val() == "") {
						message += "Please enter the singer's genre. \n";
						document.getElementById('musicgenre').style.borderColor = "red";
					}
					else document.getElementById('music_genre').style.borderColor = "#00a3cc";

					if($('input[name="music_singer"]').val() == "") {
						message += "Please enter the name of the singer/band. \n";
						document.getElementById('musicsinger').style.borderColor = "red";
					}
					else document.getElementById('music_singer').style.borderColor = "#00a3cc";


					if($('input[name="music_decade"]').val() == "") {
						message += "Please enter whether old or new artist. \n";
						document.getElementById('musicdate').style.borderColor = "red";
					}
					else document.getElementById('music_decade').style.borderColor = "#00a3cc";

					if($('input[name="music_language"]').val() == "") {
						message += "Please enter the singers's language. \n";
						document.getElementById('music_language').style.borderColor = "red";
					}
					else document.getElementById('music_language').style.borderColor = "#00a3cc";

					if($('input[name="music_ytlink"]').val() == "") {
						message += "Please enter the YouTube link to the song. \n";
						document.getElementById('musiclink').style.borderColor = "red";
					}
					else document.getElementById('music_ytlink').style.borderColor = "#00a3cc";

					var genre = $('input[name="music_genre"]').val().split(' ').filter(function(v){return v!==''});
					if(genre.length>1) {
						message += "Please ensure that the song's genre is only one word. \n";
						document.getElementById('musicgenre').style.borderColor = "red";
					}
					else if(genre.length==1) {
						document.getElementById('musicgenre').style.borderColor = "#00a3cc";
					}

					
				}

				if (window.getComputedStyle(document.getElementById('Movie')).display !== "none") {
					if($('input[name="movie_genre"]').val() == "") {
						message += "Please enter the genre of the movie/tv show. \n";
						document.getElementById('moviegenre').style.borderColor = "red";
					}
					else document.getElementById('moviegenre').style.borderColor = "#00a3cc";

					if($('input[name="movie_title"]').val() == "") {
						message += "Please enter the title of the movie/tv show. \n";
						document.getElementById('movietitle').style.borderColor = "red";
					}
					else document.getElementById('movietitle').style.borderColor = "#00a3cc";

					if($('input[name="movie_decade"]').val() == "") {
						message += "Please enter old or new movie/tv show. \n";
						document.getElementById('moviedate').style.borderColor = "red";
					}
					else document.getElementById('moviedate').style.borderColor = "#00a3cc";

					if($('input[name="movie_language"]').val() == "") {
						message += "Please enter the language of the movie/tv show. \n";
						document.getElementById('movielang').style.borderColor = "red";
					}
					else document.getElementById('movielang').style.borderColor = "#00a3cc";

					if($('input[name="movie_link"]').val() == "") {
						message += "Please enter the IMDB link to the movie/tv show. \n";
						document.getElementById('movielink').style.borderColor = "red";
					}
					else document.getElementById('movielink').style.borderColor = "#00a3cc";

					var genre = $('input[name="movie_genre"]').val().split(' ').filter(function(v){return v!==''});
					if(genre.length>1) {
						message += "Please ensure that the genre of the movie/tv show is only one word. \n";
						document.getElementById('moviegenre').style.borderColor = "red";
					}
					else if(genre.length==1) {
						document.getElementById('moviegenre').style.borderColor = "#00a3cc";
					}

					
				}

				if(message !== "") {
					e.preventDefault();
					alert(message);
				}			
			});