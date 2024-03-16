const { invoke } = window.__TAURI__.tauri

let greetInputEl
let greetMsgEl

async function greet() {
	// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
	greetMsgEl.textContent = await invoke('greet', { name: greetInputEl.value })
}

window.addEventListener('DOMContentLoaded', () => {
	let screen = document.getElementById('screen')
	let btns = document.getElementsByClassName('btn')
	Array.from(btns).forEach(element => {
		element.addEventListener('click', () => {
			// Используйте textContent элемента, а не greetMsgEl
			addToScreen(element.innerText)
		})
	})

	function addToScreen(val) {
		if (val != 'AC' && val != '=') {
			if (val == '%' || val == '÷' || val == '×' || val == '-' || val == '+') {
				if (
					screen.innerText.charAt(screen.innerText.length - 1) != '%' &&
					screen.innerText.charAt(screen.innerText.length - 1) != '÷' &&
					screen.innerText.charAt(screen.innerText.length - 1) != '×' &&
					screen.innerText.charAt(screen.innerText.length - 1) != '-' &&
					screen.innerText.charAt(screen.innerText.length - 1) != '+'
				) {
					if (screen.innerText == '0') {
						screen.textContent = ''
						screen.textContent += val
					} else {
						screen.textContent += val
					}
				}
			} else {
				if (screen.innerText == '0') {
					screen.textContent = ''
					screen.textContent += val
				} else {
					screen.textContent += val
				}
			}
		} else {
			if (val == 'AC') {
				screen.textContent = '0'
			}
			if (val == '=') {
				screen.textContent = eval(screen.innerText)
			}
		}
	}
})
