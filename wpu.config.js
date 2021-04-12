module.exports = {
	generate: {
		params: {
			type: 'Type of object to generate',
			name: 'Name of the object',
			'!branch': 'Name of a branch to create',
		},
		type: 'schema',
		alt: ['g', 'G'], //! Always first param
		run: {
			pre: [
				'git log -n 5 --graph --pretty=format:"%h -%d %s (%cr) <%an>" --abbrev-commit',
				'echo type: $!{type} name: $!{name} branch: $!{branch}',
			],
			post: [],
		},
		schema: {
			params: {
				type: { a: 'atoms', m: 'molecules', o: 'organisms' },
			},
			content: [
				{
					path: '/components/@{type}/$!{name}/$!{name}.js',
					content: `
						import React from "react"

						//import { } from "@/types"
						//import { } from "prop-types"

						const $!{name} = ({}) => {

							return (
								<div className="">
								$!{name} component, generated automagically
								</div>
							)
						}

						$!{name}.propTypes = {
							
						}

						export default $!{name}
						`,
				},
				{
					path:
						'/components/@{type}/$!{name}/__tests__/$!{name}.test.js',
					content: `
						import React from "react"
						import { render, cleanup, screen } from "@testing-library/react"

						import "@testing-library/jest-dom"

						import $!{name} from "@/@{type}/$!{name}/$!{name}"

						//import { generate } from "@/factory"

						afterEach(cleanup)

						describe("$!{name}", () => {


							test("", ()=>{
								render(<$!{name} />)
								//expect(screen.getByTestId("")).toBeVisible()
							})
						})
						`,
				},
				{
					path:
						'/components/@{type}/$!{name}/stories/$!{name}.stories.js',
					content: `
						import React from "react"

						import $!{name} from "@/@{type}/$!{name}/$!{name}"

						//import { generate } from "@/factory"
						
						export default {
						  title: "@u{type}/$!{name}",
						  component: $!{name},
						}

						export const Default = () => (
						  <div className="min-h-screen p-5">
							<$!{name} />
						  </div>
						)
						`,
				},
			],
		},
		// schema: {
		// 	// _switch: {
		// 	// 	_by: "${type}",
		// 	// 	_in: {
		// 	// 		a: { // atom

		// 	// 		},
		// 	// 		m: { // molecule

		// 	// 		},
		// 	// 		o: { // organism

		// 	// 		}
		// 	// 	}
		// 	// }
		// 	components: {
		// 		type: "dir",
		// 		"${type}": {
		// 			type: "dir"
		// 			"${name}"
		// 		}
		// 	}
		// }
	},
};
