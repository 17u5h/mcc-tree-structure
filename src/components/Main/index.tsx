import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css'
import UIButton from "../UIButton";
import addNodeHandler from "./addNodeHandler";
import removeNodeHandler from "./removeHandler";
import editNodeHandler from "./editHandler";
import {TreeNode} from "../../types";


const Main = () => {
	const initialNode = [{title: 'Node 1', id: 1, children: []}]
	const [nodes, setNodes] = useState<TreeNode[]>(initialNode)
	const [focusedNode, setFocusedNode] = useState<TreeNode | null>(null)

	const [newTitle, setNewTitle] = useState<string>('')
	const [inputDisabled, setInputDisabled] = useState<boolean>(true)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const treeRef = useRef<HTMLDivElement | null>(null)

	const buildTree = (nodes: TreeNode[] | null) => {
		if (!nodes) throw new Error('unexpectedly recursive function buildTree has got null')

		return nodes.map(node => (<div className={styles.node}
																	 key={node.id}
																	 onClick={(e) => handleFocus(e, node)}
																	 onDoubleClick={startEditing}
			>
				<input className={styles.nodeInput}
							 data-id={node.id}
							 style={{backgroundColor: focusedNode?.id === node.id ? "#e1e1e1" : "inherit"}}
							 disabled={inputDisabled}
							 placeholder={node.title}
							 value={(focusedNode?.id === node.id ? newTitle : node.title)}
							 onChange={e => setNewTitle(e.target.value)}
							 onBlur={onBlur}
							 onKeyDown={e => SubmitByPressEnter(e)}
				/>
				{node.children && buildTree(node.children)}
			</div>)
		)
	}

	const startEditing = () => {
		if (!focusedNode) return
		setIsEditing(!isEditing)
		setInputDisabled(false)
	}

	useEffect(() => {
		if (!focusedNode) return
		if (isEditing) {
			const focusedInput = treeRef.current?.querySelector(`input[data-id='${focusedNode.id}']`)
			if (focusedInput) (focusedInput as HTMLElement)?.focus()
		}
	}, [isEditing])

	const handleFocus = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: TreeNode) => {
		event.stopPropagation()
		setFocusedNode(node)
	}

	const onBlur = () => {
		setFocusedNode(null)
		setInputDisabled(true)
		setNewTitle('')
		if (newTitle) editNodeHandler(nodes, focusedNode, setNodes, newTitle)
		setIsEditing(false)
	}

	const SubmitByPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onBlur()
	}

	const resetHandler = () => {
		setNodes(initialNode)
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>Tree</header>
			<main className={styles.main} onClick={onBlur} ref={treeRef}>
				{buildTree(nodes)}
			</main>
			<footer className={styles.controls}>
				<UIButton onClick={() => addNodeHandler(nodes, focusedNode, setNodes)}>Add</UIButton>
				<UIButton onClick={() => removeNodeHandler(nodes, focusedNode, setNodes)}>Remove</UIButton>
				<UIButton onClick={startEditing}>Edit</UIButton>
				<UIButton onClick={resetHandler}>Reset</UIButton>
			</footer>
		</div>
	);
};

export default Main;