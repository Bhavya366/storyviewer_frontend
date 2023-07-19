import React, { useEffect, useState } from "react";
import './AddStory.css';
import useStoryContext from "../../hooks/useStoryContext";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
const categories = ["food", "health and fitness", "travel", "movies", "education"];

const AddStory = () => {

	const { setPopup, id, setId,change,setChange } = useStoryContext();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [formData, setFormData] = useState([]);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [slides, setSlides] = useState([1, 2, 3])

	const handleInputChange = (event, currentSlide) => {
		const { name, value } = event.target;
		const updatedFormData = [...formData];
		updatedFormData[currentSlide] = {
			...updatedFormData[currentSlide],
			[name]: value,
		};
		setFormData(updatedFormData);
	};

	const handlePrevious = () => {
		setCurrentSlide((prevSlide) => prevSlide - 1);
	};

	const handleNext = () => {
		setCurrentSlide((prevSlide) => prevSlide + 1);
	};

	const deletePopup = () => {
		setPopup(false)
		setId('')
	}

	const handleSubmit = () => {

		
		console.log(formData);
		let data = {}
		console.log(currentSlide)
		console.log(id)
		if (currentSlide === 0) {
			data = {
				storyId: id,
				heading: formData[currentSlide].heading_0,
				category: formData[currentSlide].category_0,
				imageLink: formData[currentSlide].imageLink_0,
				description: formData[currentSlide].description_0,
			}
		}
		else if (currentSlide === 1) {
			data = {
				storyId: id,
				heading: formData[currentSlide].heading_1,
				category: formData[currentSlide].category_1,
				imageLink: formData[currentSlide].imageLink_1,
				description: formData[currentSlide].description_1,
			}
		}
		else if (currentSlide === 2) {
			data = {
				storyId: id,
				heading: formData[currentSlide].heading_2,
				category: formData[currentSlide].category_2,
				imageLink: formData[currentSlide].imageLink_2,
				description: formData[currentSlide].description_2,
			}
		}
		else if (currentSlide ===3) {
			data = {
				storyId: id,
				heading: formData[currentSlide].heading_3,
				category: formData[currentSlide].category_3,
				imageLink: formData[currentSlide].imageLink_3,
				description: formData[currentSlide].description_3,
			}
		}
		else if (currentSlide === 4) {
			data = {
				storyId: id,
				heading: formData[currentSlide].heading_4,
				category: formData[currentSlide].category_4,
				imageLink: formData[currentSlide].imageLink_4,
				description: formData[currentSlide].description_4,
			}
		}
		else if (currentSlide === 5) {
			data = {
				storyId: id,
				heading: formData[currentSlide].heading_5,
				category: formData[currentSlide].category_5,
				imageLink: formData[currentSlide].imageLink_5,
				description: formData[currentSlide].description_5,
			}
		}

		try {
			if (
				!data.storyId ||
				!data.heading ||
				!data.category ||
				!data.imageLink ||
				!data.description
			) {
				toast.error("Please fill all the fields", {
					position: "top-center",
					autoClose: 1000,
				});
				return;
			}
			 axios.post(`http://localhost:4500/slide`, data, {
				headers: {
					authorization: `${localStorage.getItem("token")}`,
				},
			}).then((response)=>{
				setChange(true);
				toast.success("Slide Added Successfully", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: true,
			})});
			
		} catch (err) {
			if (err.response.status === 401) {
				toast.error("Please login to add product", {
					position: "top-center",
					autoClose: 1000,
				});
				return;
			}
			toast.error("Something went wrong", {
				position: "top-center",
				autoClose: 1000,
			});
		}
	}
	useEffect(() => {
	setSlides(slides)
	}, [slides])

const addSlide = () => {
	if (slides.length < 6) {
		let nextval = slides[slides.length - 1] + 1
		setSlides([...slides, nextval])

	}
}
const slideData = formData[currentSlide] || {};
return (
	<div className="addstory-popup">
		<div className="add-form-slides">
			<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36" fill="none" className="into-mark" onClick={() => {
				if(formData.length >= 3){
					deletePopup()
				}
				else{
					toast.error("Please fill atleast three slides", {
						position: "top-center",
						autoClose: 1000,
					});
				}
			}}>
				<path d="M17.8191 0C7.99395 0 0 7.99395 0 17.8191C0 27.6442 7.99395 35.6381 17.8191 35.6381C27.6442 35.6381 35.6381 27.6442 35.6381 17.8191C35.6381 7.99395 27.6442 0 17.8191 0ZM17.8191 2.7414C26.1611 2.7414 32.8967 9.47709 32.8967 17.8191C32.8967 26.1611 26.1611 32.8967 17.8191 32.8967C9.47709 32.8967 2.7414 26.1611 2.7414 17.8191C2.7414 9.47709 9.47709 2.7414 17.8191 2.7414ZM12.6361 10.6657L10.6657 12.6361L15.8487 17.8191L10.6657 23.002L12.6361 24.9724L17.8191 19.7894L23.002 24.9724L24.9724 23.002L19.7894 17.8191L24.9724 12.6361L23.002 10.6657L17.8191 15.8487L12.6361 10.6657Z" fill="#FF0000" />
			</svg><br></br>
			<div className="both-slides-form">
				<div className="n-slides">{
					slides.map((item, index) => {
						return (
							<div key={index} className={currentSlide == index ? "each-slide-selected" : "each-slide"}>
								<h4 >Slide {item} </h4>
							</div>)
					})}
					<div className="each-slide" onClick={() => addSlide()}>
						<h4 >Add +</h4>
					</div>
				</div><br></br>
				<form className="addstory-label-input">
					<div className="label-input"><div style={{ width: "30%" }}><h3>Heading:</h3></div>
						<div className="inputs-form">
							<input
							type="text"
							className="addstory-inputs"
							name={`heading_${currentSlide}`}
							placeholder="Your Heading"
							value={slideData[`heading_${currentSlide}`] || ""}
							onChange={(e) => handleInputChange(e, currentSlide)}
						/></div>
					</div><br></br>
					<div className="label-input"><div style={{ width: "30%" }}><h3>Description:</h3></div>
						<div className="inputs-form">
							<textarea cols={30} rows={5} style={{ resize: "none" }}
							name={`description_${currentSlide}`}
							placeholder="Story Description"
							className="addstory-inputs"
							value={slideData[`description_${currentSlide}`] || ""}
							onChange={(e) => handleInputChange(e, currentSlide)}
						></textarea></div>
					</div><br></br>
					<div className="label-input"><div style={{ width: "30%" }}><h3>Image:</h3></div>
						<div className="inputs-form"><input
							type="text"
							className="addstory-inputs"
							name={`imageLink_${currentSlide}`}
							placeholder="Add image url"
							value={slideData[`imageLink_${currentSlide}`] || ""}
							onChange={(e) => handleInputChange(e, currentSlide)}
						/></div>
					</div><br></br>
					<div className="label-input">
						<div style={{ width: "30%" }}><h3>Category:</h3></div>
						<div className="inputs-form"><select
							className="addstory-inputs"
							name={`category_${currentSlide}`}
							value={slideData[`category_${currentSlide}`] || categories[0]}
							onChange={(e) => handleInputChange(e, currentSlide)}
						>
							<option>Select</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select></div>
					</div>
				</form></div>
			<div className="addstory-form-buttons">
				<div className="previous-next-buttons">
					{currentSlide > 0 && (
						<button onClick={handlePrevious} className="previous-button">Previous</button>
					)}
					{currentSlide < 5 && (
						<button onClick={handleNext} className="next-button">Next</button>
					)}
				</div>
				<div>
					<button onClick={handleSubmit} className="submit-button">Add</button>
				</div>
			</div>
		</div>
		<ToastContainer />
	</div >
	);
};

export default AddStory;

