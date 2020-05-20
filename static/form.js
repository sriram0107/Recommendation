document.getElementById('Music').style.display = "none";
			document.getElementById('Movie').style.display = "none";
			document.getElementById('Cook').style.display = "none";
			document.getElementById('SubmitButton').style.display = "none";

			var checkedActivities = [];
			var checkedMusicGenre = [];
			var checkedMusicLang = [];
			var checkedMusicTime = [];
			var checkedMovieGenre = [];
			var checkedMovieLang = [];
			var checkedMovieTime = [];

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
					else if(value.localeCompare("Cook")==0) {
						document.getElementById('Cook').style.display = "inline";
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
						else if(value.localeCompare("Cook")==0) {
							document.getElementById('Cook').style.display = "none";
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

			$("input:radio[name='music']").change(function() {
				var value = $(this).val();
				if ($(this).prop('checked')) {
					checkedMusicGenre.push(value);
				}
			});

			$("input:radio[name='music_language']").change(function() {
				var value = $(this).val();
				if ($(this).prop('checked')) {
					checkedMusicLang.push(value);
				}
			});

			$("input:radio[name='movie']").change(function() {
				var value = $(this).val();
				if ($(this).prop('checked')) {
					checkedMovieGenre.push(value);
				}
			});
			
			$("input:radio[name='movie_language']").change(function() {
				var value = $(this).val();
				if ($(this).prop('checked')) {
					checkedMovieLang.push(value);
				}
			});

			$('input[type=submit]').on('click', function(e) {
				var message = "";
				if (window.getComputedStyle(document.getElementById('Music')).display !== "none") {
					if($("input:radio[name='music_genre']:checked").length==0) {
						message += "Please select the genre of music. \n";
						document.getElementById('musicgenretext').style.color = "red";
					}
					else document.getElementById('musicgenretext').style.color = "black";

					if($("input:radio[name='music_language']:checked").length==0) {
						message += "Please select the language of music. \n";
						document.getElementById('musiclangtext').style.color = "red";
					}
					else document.getElementById('musiclangtext').style.color = "black";

					if($("input:radio[name='music_decade']:checked").length==0) {
						message += "Please select the type of music. \n";
						document.getElementById('musictimetext').style.color = "red";
					}
					else document.getElementById('musictimetext').style.color = "black";
				}

				if (window.getComputedStyle(document.getElementById('Movie')).display !== "none") {
					if($("input:radio[name='movie_genre']:checked").length==0) {
						message += "Please select the genre of movie/tv show. \n";
						document.getElementById('moviegenretext').style.color = "red";
					}
					else document.getElementById('moviegenretext').style.color = "black";

					if($("input:radio[name='movie_language']:checked").length==0) {
						message += "Please select the language of movie/tv show. \n";
						document.getElementById('movielangtext').style.color = "red";
					}
					else document.getElementById('movielangtext').style.color = "black";

					if($("input:radio[name='movie_decade']:checked").length==0) {
						message += "Please select the type of movie/tv show. \n";
						document.getElementById('movietimetext').style.color = "red";
					}
					else document.getElementById('movietimetext').style.color = "black";

				}

				if (window.getComputedStyle(document.getElementById('Cook')).display !== "none") {
					if($('input[name="ingr"]').val() == "") {
						message += "Please enter your favourtie ingredient. \n";
						document.getElementById('ingredientList').style.borderColor = "red";
					}
					else document.getElementById('ingredientList').style.borderColor = "#00cc7a";
				}

				if(message !== "") {
					e.preventDefault();
					alert(message);
				}
			});

