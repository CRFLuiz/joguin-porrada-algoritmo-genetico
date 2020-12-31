const Element = function(){} 

Element.prototype.button = function(container){
	const selector = container.selector.id ? document.getElementById(container.selector.id) :
		container.selector.className ? document.getElementsByClassName(container.selector.className) :
		container.selector.tagName ? document.getElementsByTagName(container.selector.tagName) :
		container.selector.name ? document.getElementsByName(container.selector.name) : null; 
	if(selector === null) throw new Error("You must send a selector type with value. Example:\n{ selector: { id|className|tagName|name : <VALUE> } }");
	
	return {
		// CLEANUP ALL HTML INSIDE SELECTOR
		cleanup: function(){
			selector.innerHTML = "";
		},
		// CREATE ELEMENT USING document.createElement
		create: function(btns){
			if(!Array.isArray(btns)) throw new Error("The Element.button.create must receive an Array as argument.");
			let html = "";
			btns.forEach(e => {
				let btn = document.createElement("button");
				let div = document.createElement("div");
				let spn = document.createElement("span");
				let txt = document.createTextNode(e.inner.text);

				// CALLBACK TO EXAMPLE
				btn.onclick = e.callback ? () => e.callback() : () => null;
				
				btn.id = e.id;
				btn.className = `uk-button ${e.classColor ? "uk-button-"+e.classColor : ""} ${e.className}`;
				if(!e.enabled) btn.setAttribute('disabled', true);
				div.className = `uk-text-center ${e.inner.upper ? "uk-text-uppercase" : ""}`;
				
				if(e.inner.icon){
					spn.setAttribute("uk-icon", e.inner.icon);
					spn.appendChild(txt);
					div.appendChild(spn);
				}else{
					div.appendChild(spn);
				}
				btn.appendChild(div);
				
				selector.appendChild(btn);
			});
		},
		// CREATE ELEMENT USING Element.innerHTML
		create2: function(btns){
			if(!Array.isArray(btns)) throw new Error("The Element.button.create must receive an Array as argument.");
			let html = "";
			btns.forEach(e => {
				html += `<button id="${e.id}" class="uk-button ${e.classColor ? "uk-button-"+e.classColor : ""} ${e.className}">`;
				html += `<div class="uk-text-center ${e.inner.upper ? "uk-text-uppercase" : ""}">${e.inner.icon ? "<span uk-icon="+e.inner.icon+"></span>" : ""}${e.inner.text}</div>`;
				html += `</button>`;
			});
			selector.innerHTML = html;
		},
		// REMOVE BUTTON USING Element.remove
		remove: function(btns){
			if(!Array.isArray(btns)) throw new Error("The Element.button.create must receive an Array as argument.");
			btns.forEach(e => {
				let btn = e.id ? selector.querySelector(`#${e.id}`) :
					e.className ? selector.getElementsByClassName(e.className) :
					e.tagName ? selector.getElementsByTagName(e.tagName) :
					e.name ? selector.getElementsByName(e.name) : null;
				
				if(btn == null) throw new Error("You must send a selector type as argument. Example:\n[{ id|className|tagName|name : <VALUE> }]");

				if(btn instanceof(HTMLCollection)){
					for(let i = 0; i < btn.length; i++) btn[i].remove();
				}else btn.remove();
			});
		}
	}
};