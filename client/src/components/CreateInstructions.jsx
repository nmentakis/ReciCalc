import React from 'react';
import InstructionInput from './InstructionInput.jsx';


const CreateInstructions = ({instructions, addNewInstruction, updateRecipe, deleteItem}) => (
        <div id='create-instructions'>
            <h3>Instructions:</h3>
            <input className='add button' type='button' value='Add Instruction' onClick={addNewInstruction} />
            {instructions.map((instruction, index) => <InstructionInput
                key={`${instruction.counter}`}
                index={index}
                instruction={instruction}
                updateRecipe={updateRecipe}
                deleteItem={deleteItem}
            />)}
        </div>
)
    

export default CreateInstructions;