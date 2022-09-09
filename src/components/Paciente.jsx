import React from 'react';
import Swal from 'sweetalert2';

const Paciente = ({ paciente, setPaciente, eliminarPaciente }) => {
	//Destructuracion (evitamos paciente.nombre, paciente.email, etc).
	const { nombre, propietario, email, fecha, sintomas, id } = paciente;

	const handleEliminar = () => {
		//Preguntamos si esta seguro de eliminar dicho registro
		Swal.fire({
			title: 'Estas seguro?',
			text: 'No vas a poder recuperarlo!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'No, mejor no!',
			confirmButtonText: 'Si, borralo!',

			//Espera una respuesta por parte de la promesa
		}).then((result) => {
			if (result.isConfirmed) {
				eliminarPaciente(id);
				Swal.fire('Borrado!', 'El registro se borro con exito.', 'success');
			}
		});
	};

	return (
		<div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
			<p className='font-bold mb-3 text-gray-700 uppercase'>
				Nombre: {''}
				<span className='font-normal normal-case'>{nombre}</span>
			</p>
			<p className='font-bold mb-3 text-gray-700 uppercase'>
				Propietario: {''}
				<span className='font-normal normal-case'>{propietario}</span>
			</p>
			<p className='font-bold mb-3 text-gray-700 uppercase'>
				Email: {''}
				<span className='font-normal normal-case'>{email}</span>
			</p>
			<p className='font-bold mb-3 text-gray-700 uppercase'>
				Fecha Alta: {''}
				<span className='font-normal normal-case'>{fecha}</span>
			</p>
			<p className='font-bold mb-3 text-gray-700 uppercase'>
				Sintomas: {''}
				<span className='font-normal normal-case'>{sintomas}</span>
			</p>
			<div className='flex justify-between mt-10'>
				<button
					className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
					type='button'
					onClick={() => setPaciente(paciente)}
				>
					Editar
				</button>
				<button
					className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
					type='button'
					onClick={handleEliminar}
				>
					Eliminar
				</button>
			</div>
		</div>
	);
};

export default Paciente;
