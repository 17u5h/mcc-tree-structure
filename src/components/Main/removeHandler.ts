import {TreeNode} from "../../types";

const removeNodeHandler = (nodes: TreeNode[], focusedNode: TreeNode | null, setNodes: (nodes: TreeNode[]) => void) => {
	if (!focusedNode) return
	const cloneNodes = [...nodes]

	const mutateNodes = (nodes: TreeNode[]) => {
		if (!nodes) throw new Error('unexpectedly recursive function mutateNodes in removeNodeHandler has got null')

		const foundNode = nodes.find(node => node === focusedNode)

		if (foundNode) {
			const indexOfFocusedNode = nodes.indexOf(foundNode)
			nodes.splice(indexOfFocusedNode, 1)

		} else {
			nodes.map(node => {
				if (node.children) mutateNodes(node.children)
			})
		}
	}
	mutateNodes(cloneNodes)
	setNodes(cloneNodes)
}

export default removeNodeHandler