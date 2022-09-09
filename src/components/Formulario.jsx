import React from 'react';
import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');

	const [error, setError] = useState(false);

	//Completamos los campos del formulario para la Edicion
	useEffect(() => {
		if (Object.keys(paciente).length > 0) {
			setNombre(paciente.nombre);
			setPropietario(paciente.propietario);
			setEmail(paciente.email);
			setFecha(paciente.fecha);
			setSintomas(paciente.sintomas);
		}
	}, [paciente]);

	//Generando KEY unica para el objeto Paciente
	const generarId = () => {
		const random = Math.random().toString(36).substring(2);
		const fecha = Date.now().toString(36);

		return random + fecha;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validacion del Formulario
		if ([nombre, propietario, email, fecha, sintomas].includes('')) {
			setError(true);
			return;
		}
		setError(false);

		//Objeto de Paciente
		const objetoPaciente = {
			nombre,
			propietario,
			email,
			fecha,
			sintomas,
		};

		if (paciente.id) {
			//Editando Registro
			objetoPaciente.id = paciente.id;

			//PacienteUpdated es lo que se llama una variable temporal
			const pacientesActualizados = pacientes.map((pacienteUpdated) =>
				pacienteUpdated.id === paciente.id ? objetoPaciente : pacienteUpdated
			);

			//Le pasamos a setPacientes el estado actualizado
			setPacientes(pacientesActualizados);

			//Regresamos setPaciente a objeto vacio
			setPaciente({});
		} else {
			//Nuevo Registro
			objetoPaciente.id = generarId();
			setPacientes([...pacientes, objetoPaciente]);
		}

		//Reiniciar el formulario
		setNombre('');
		setPropietario('');
		setEmail('');
		setFecha('');
		setSintomas('');
	};

	return (
		<div className='md:w-1/2 lg:w-2/5 mx-5'>
			<h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
			<p className='text-lg mt-5 text-center mb-10'>
				Agrega Pacientes y{' '}
				<span className='text-indigo-600 font-bold'>Administralos</span>
			</p>

			<form
				className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
				onSubmit={handleSubmit}
			>
				{error && (
					<Error>
						<p>Todos los campos son obligatorios</p>
					</Error>
				)}
				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='mascota'
					>
						Nombre Mascota
					</label>
					<input
						id='mascota'
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='text'
						placeholder='Nombre de la Mascota'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='propietario'
					>
						Nombre Propietario
					</label>
					<input
						id='propietario'
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='text'
						placeholder='Nombre del Propietario'
						value={propietario}
						onChange={(e) => setPropietario(e.target.value)}
					/>
				</div>
				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='email'
					>
						Email
					</label>
					<input
						id='email'
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='email'
						placeholder='Email Contacto Propietario'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='alta'
					>
						Alta
					</label>
					<input
						id='alta'
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='date'
						value={fecha}
						onChange={(e) => setFecha(e.target.value)}
					/>
				</div>
				<div>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='sintomas'
					>
						Sintomas
					</label>
					<textarea
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none'
						id='sintomas'
						placeholder='Describe los Sintomas'
						value={sintomas}
						onChange={(e) => setSintomas(e.target.value)}
					/>
				</div>

				<input
					className='bg-indigo-600 w-full p-3 mt-5 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
					type='submit'
					value={paciente.id ? 'Guardar Edicion' : 'Agregar Paciente'}
				/>
			</form>
		</div>
	);
};

export default Formulario;
