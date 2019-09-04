# Introductions
----------
Thanks for giving me the chance to take this task and prove myself to you guys.
whenever you would like to check my work please notice that to get everything right use live-server becuase of json file.
=======
### Bonus points (Explaination)
* Explain why the result of `('b' + 'a' + + 'a' + 'a').toLowerCase()` is `banana`.
* +'a' resolves to NaN ("Not a Number") because it coerces a string to a number, while the character  a cannot be parsed as a number. 

[console.log(+ "a")]
 
To lowercase it becomes banana.
Adding NaN to "ba" turns NaN into the string "NaN" due to type conversion, gives baNaN. And then there is an a behind, giving baNaNa.

The space between + + is to make the first one string concatenation and the second one a unary plus (i.e. "positive") operator. You have the same result if you use 'ba'+(+'a')+'a', resolved as 'ba'+NaN+'a', which is equivalent to 'ba'+'NaN'+'a' due to type juggling.
 