import {TreeNode} from "../../types";

const editNodeHandler = (nodes: TreeNode[], focusedNode: TreeNode | null, setNodes: (nodes: TreeNode[]) => void, newTitle: string) => {
	const cloneNodes = [...nodes]

	const mutateNodes = (nodes: TreeNode[]) => {
		if (!nodes) throw new Error('unexpectedly recursive function mutateNodes in editNodeHandler has got null')

		const foundNode = nodes.find(node => node === focusedNode)
		if (foundNode) {
			const indexOfFocusedNode = nodes.indexOf(foundNode)
			nodes[indexOfFocusedNode].title = newTitle
		} else {
			nodes.map(node => {
				if (node.children) mutateNodes(node.children)
			})
		}
	}
	mutateNodes(cloneNodes)
	setNodes(cloneNodes)
}

export default editNodeHandler