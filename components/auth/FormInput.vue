<template>
	<div class="form-group">
		<div>
			<template class="error-holder">
				<template v-if="$attrs.type === 'phone'">
					<p
						class="error-message"
						v-if="isError && input.length === 0"
					>
						Поле
						{{
              labelText[0].toLowerCase() +
              labelText.split("").splice(1, labelText.length).join("")
            }}
						обязательно к заполнению
					</p>
					<p
						class="error-message"
						v-else-if="isError"
					>
						Поле
						{{
              labelText[0].toLowerCase() +
              labelText.split("").splice(1, labelText.length).join("")
            }}
						должно состоять из 11 символов
					</p>
				</template>
				<template v-else-if="$attrs.type === 'password'">
					<p
						class="error-message"
						v-if="isError && input.length === 0"
					>
						Поле
						{{
              labelText[0].toLowerCase() +
              labelText.split("").splice(1, labelText.length).join("")
            }}
						обязательно к заполнению
					</p>
					<p
						class="error-message"
						v-else-if="isError"
					>
						Поле
						{{
              labelText[0].toLowerCase() +
              labelText.split("").splice(1, labelText.length).join("")
            }}
						должен включать как минимум 6 символов
					</p>
				</template>
				<template v-else-if="this.$attrs.type === 'email'">
					<p
						v-if="isError & (input.length > 0)"
						class="error-message"
					>
						Введите корректный адрес почты
					</p>
					<p
						class="error-message"
						v-else-if="isError"
					>
						Поле
						{{
              labelText[0].toLowerCase() +
              labelText.split("").splice(1, labelText.length).join("")
            }}
						обязательно к заполнению
					</p>
				</template>
				<template v-else>
					<p
						class="error-message"
						v-if="isError"
					>
						Поле
						{{
              labelText
            }}
						обязательно к заполнению
					</p>
				</template>
			</template>
		</div>
		<label
			for=""
			v-if="isLabel"
		>{{ labelText }}</label>
		<div
			class="input-template"
			:class="{
        'valid-input': isError === false,
        'invalid-input': isError,
        'input-template-hover': isFocus,
      }"
		>

			<input
				v-bind="$attrs"
				v-model.trim="input"
				ref="inputer"
				required
				@input="inputHandler"
				@blur="isError = $v.input.$invalid"
			/>

			<span
				v-if="isError"
				class="span-error"
			>×</span>
			<span
				v-if="isError === false"
				class="span-success"
			>✓</span>
			<!-- {{ $v.input }} -->
		</div>
	</div>
</template>

<script>
import { minLength, required, email, numeric, maxLength } from "vuelidate/lib/validators";

export default {
	inheritAttrs: false,
	props: {
		inputValue: {
			type: String,
			required: true,
		},
		isLabel: {
			type: Boolean,
			required: true,
		},
		labelText: {
			type: String,
		},
	},
	data () {
		return {
			isError: null,
			input: this.inputValue,
		};
	},
	computed: {
		isValid () {
			return this.$v.input.$invalid;
		},
		isFocus () {
			return this.$refs.inputer;
		},
	},
	validations () {
		switch (this.$attrs.type) {
			case "password":
				return {
					input: {
						required,
						minLength: minLength(6)
					}
				}
				break;
			case "phone":
				return {
					input: {
						required,
						minLength: minLength(11),
						maxLength: maxLength(11),
					}
				}
				break;
			case "number":
				return {
					input: {
						required,
						numeric,
					}
				}
				break;
			case "email":
				return {
					input: {
						required,
						email
					}
				}
				break;
			default:
				return {
					input: {
						required
					}
				}
				break;
		}
	},
	methods: {
		async inputHandler (event) {
			this.$emit("change", event.target.value);
			this.$emit("isValid", !this.$v.input.$invalid);
		},
	},
};
</script>

<style scoped>
.invalid-input {
	border-color: #f50057 !important;
}
.error-message {
	color: #f50057;
	text-align: left;
	margin-bottom: 3px;
}
.valid-input {
	border-color: #2fe20c !important;
}
.input-template {
	display: flex;
	align-items: center;
	margin: 0 auto;
	justify-content: space-between;
	border: 1px solid #495057;
	padding: 5px;
	width: 300px;
	border-radius: 0.25rem;
}
.input-template-hover {
	border-color: #80bdff;
	box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
span {
	margin-right: 5px;
}
input {
	border: transparent;
}
input:focus {
	outline: none;
}

.span-error {
	color: #f50057;
}

.span-success {
	color: #2fe20c;
}
</style>
