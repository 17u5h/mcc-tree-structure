import {TreeNode} from "../../types";

const addNodeHandler = (nodes: TreeNode[], focusedNode: TreeNode | null, setNodes: (nodes: TreeNode[]) => void) => {
	const cloneNodes = [...nodes]
	let maxId = 0

	const findMaxId = (nodes: TreeNode[]) => {
		nodes.map(node => {
			if (node.id > maxId) maxId = node.id
			if (node.children) findMaxId(node.children)
		})
	}
	findMaxId(nodes)

	const newNode = {
		title: `Node ${maxId + 1}`,
		id: maxId + 1,
		children: []
	}

	if (!focusedNode) cloneNodes.push(newNode)

	const mutateNodes = (nodes: TreeNode[]) => {
		if (!nodes) throw new Error('unexpectedly recursive function mutateNodes in addNodeHandler has got null')

		const foundNode = nodes.find(node => node === focusedNode)

		if (foundNode) {
			const indexOfFocusedNode = nodes.indexOf(foundNode)
			nodes[indexOfFocusedNode].children.push(newNode)

		} else {
			nodes.map(node => {
				if (node.children) mutateNodes(node.children)
			})
		}
	}
	if (focusedNode) mutateNodes(cloneNodes)
	setNodes(cloneNodes)
}

export default addNodeHandler